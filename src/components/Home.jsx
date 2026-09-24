import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        API.get('products/')
            .then(response => {
                setProducts(response.data.results || response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Mahsulotlarni olishda xatolik:", error);
                setLoading(false);
            });
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category_name || p.category).filter(Boolean))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const productCat = product.category_name || product.category;
        const matchesCategory = selectedCategory === 'All' || productCat === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto p-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Bizning Mahsulotlar</h1>
                <p className="text-gray-600 mt-2">Eng sara mahsulotlarni qulay narxlarda xarid qiling</p>
            </header>

            {/* Qidiruv va Filter paneli */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Mahsulot nomini qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 border rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 shadow-sm"
                />

                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                                selectedCategory === cat
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <p className="text-center text-gray-500 text-lg">Yuklanmoqda...</p>
            ) : filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Hech qanday mahsulot topilmadi.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
                            <div>
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={product.images[0].image.startsWith('http') ? product.images[0].image : `http://127.0.0.1:8000${product.images[0].image}`}
                                        alt={product.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">Rasm yo'q</div>
                                )}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h2>
                                    <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                                </div>
                            </div>
                            <div className="p-4 pt-0 flex items-center justify-between mt-4">
                                <span className="text-xl font-bold text-green-600">{product.price} so'm</span>
                                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                  Ko'rish
                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}