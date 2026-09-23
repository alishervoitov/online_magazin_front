import { useState, useEffect } from 'react';
import API from '../services/api';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Backenddan foydalanuvchi ma'lumotlarini olish
        API.get('profile/', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setProfile(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Profil ma'lumotlarini olishda xatolik:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-gray-500 text-lg">Yuklanmoqda...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profil ma'lumotlari */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Foydalanuvchi Profili 👤</h1>
                <div className="space-y-3 text-gray-700">
                    <p><strong>Foydalanuvchi nomi:</strong> {profile?.username || 'Nomaʼlum'}</p>
                    <p><strong>Email:</strong> {profile?.email || 'Kiritilmagan'}</p>
                </div>
            </div>

            {/* Buyurtmalar tarixi */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Buyurtmalar tarixi 📦</h2>
                <p className="text-gray-500">Hozircha buyurtmalar tarixi mavjud emas yoki backendga ulanmagan.</p>
            </div>
        </div>
    );
}