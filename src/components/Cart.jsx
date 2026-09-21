import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // LocalStorage'dan savatchadagi mahsulotlarni o'qib olamiz
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    // Mahsulotni savatchadan o'chirish
    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Jami narxni hisoblash
    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Savatchangiz boʻsh 🛒</h2>
                <p className="text-gray-600 mb-6">Hozircha savatchaga hech qanday mahsulot qoʻshmagansiz.</p>
                <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md">
                    Xarid qilishni boshlash
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Sizning savatchangiz</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Mahsulotlar ro'yxati */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {item.images && item.images.length > 0 ? (
                                    <img
                                        src={item.images[0].image.startsWith('http') ? item.images[0].image : `http://127.0.0.1:8000${item.images[0].image}`}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">Rasm yo'q</div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                                    <p className="text-green-600 font-bold mt-1">{item.price} soʻm</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 font-medium text-sm transition"
                            >
                                Oʻchirish ❌
                            </button>
                        </div>
                    ))}
                </div>

                {/* Buyurtma xulosasi */}
                <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Buyurtma xulosasi</h3>
                    <div className="flex justify-between mb-4 text-lg font-semibold border-b pb-4">
                        <span>Jami narx:</span>
                        <span className="text-green-600">{totalPrice} soʻm</span>
                    </div>
                    <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-md">
                        Buyurtmani rasmiylashtirish
                    </button>
                </div>
            </div>
        </div>
    );
}