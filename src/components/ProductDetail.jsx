import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`products/${id}/`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Mahsulot tafsilotlarini olishda xatolik:", error);
                setLoading(false);
            });
    }, [id]);

    // Savatchaga qo'shish funksiyasi


// ... funksiya ichida ...
    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const isAlreadyInCart = existingCart.find(item => item.id === product.id);

        if (!isAlreadyInCart) {
            existingCart.push(product);
            localStorage.setItem('cart', JSON.stringify(existingCart));
            toast.success("Mahsulot savatchaga qoʻshildi! 🛒"); // <-- Zamonaviy xabar
        } else {
            toast("Bu mahsulot allaqachon savatchada mavjud.", { icon: '⚠️' });
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-gray-500 text-lg">Yuklanmoqda...</div>;
    }

    if (!product) {
        return <div className="text-center py-20 text-red-500 text-lg">Mahsulot topilmadi.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
                &larr; Orqaga qaytish
            </Link>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div>
                    {product.images && product.images.length > 0 ? (
                        <img
                            src={product.images[0].image.startsWith('http') ? product.images[0].image : `http://127.0.0.1:8000${product.images[0].image}`}
                            alt={product.title}
                            className="w-full h-96 object-cover rounded-xl shadow-md"
                        />
                    ) : (
                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400 rounded-xl">Rasm yo'q</div>
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                        <p className="text-2xl font-bold text-green-600 mb-4">{product.price} so'm</p>
                        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                    </div>

                    <button
                        onClick={addToCart}
                        className="bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition shadow-md w-full md:w-auto"
                    >
                        Savatchaga qoʻshish 🛒
                    </button>
                </div>
            </div>
        </div>
    );
}