import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Checkout() {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            alert('Savatchangiz boʻsh!');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                address,
                phone,
                items: cart.map(item => ({
                    product: item.id,
                    quantity: 1 // Agar savatchada miqdor (quantity) bo'lmasa, har biridan 1 tadan olamiz
                }))
            };

            // Backendga POST so'rov yuborish
            await API.post('orders/', orderData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            // Savatchani tozalaymiz
            localStorage.removeItem('cart');
            alert('Buyurtmangiz muvaffaqiyatli qabul qilindi! Rahmat.');
            navigate('/profile'); // Buyurtmalar ko'rinishi uchun profilga o'tkazamiz
        } catch (err) {
            console.error(err);
            setError('Buyurtma berishda xatolik yuz berdi. Qaytadan urinib koʻring.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Buyurtmani rasmiylashtirish</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                    <label className="block text-gray-600 text-sm mb-1">Yetkazib berish manzili</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Masalan: Toshkent sh., Chilonzor 1-kvartira"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 text-sm mb-1">Telefon raqam</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+998 90 123 45 67"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium shadow-md disabled:opacity-50"
                >
                    {loading ? 'Yuborilmoqda...' : 'Buyurtmani tasdiqlash'}
                </button>
            </form>
        </div>
    );
}