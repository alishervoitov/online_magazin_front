import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Profil va buyurtmalarni bir vaqtda so'raymiz
        Promise.all([
            API.get('profile/', { headers }),
            API.get('orders/', { headers })
        ])
            .then(([profileRes, ordersRes]) => {
                setProfile(profileRes.data);
                setOrders(ordersRes.data.results || ordersRes.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Ma'lumotlarni olishda xatolik:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-gray-500 text-lg">Yuklanmoqda...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            {/* Profil ma'lumotlari */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Foydalanuvchi Profili 👤</h1>
                <div className="space-y-2 text-gray-700">
                    <p><strong>Foydalanuvchi nomi:</strong> {profile?.username}</p>
                    <p><strong>Email:</strong> {profile?.email || 'Kiritilmagan'}</p>
                </div>
            </div>

            {/* Buyurtmalar tarixi */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Buyurtmalar tarixi 📦</h2>

                {orders.length === 0 ? (
                    <p className="text-gray-500">Sizda hali buyurtmalar mavjud emas.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="border rounded-xl p-4 shadow-sm bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="font-semibold text-gray-800">Buyurtma № {order.id}</p>
                                    <p className="text-sm text-gray-600">Manzil: {order.address}</p>
                                    <p className="text-sm text-gray-600">Telefon: {order.phone}</p>
                                    <p className="text-xs text-gray-400 mt-1">Sana: {new Date(order.created_at || Date.now()).toLocaleDateString()}</p>
                                </div>
                                <div>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {order.status || 'Qabul qilindi'}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}