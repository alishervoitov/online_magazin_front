import { Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import { useEffect, useState } from 'react';
import API from './services/api';
import Navbar from './components/Navbar';

// Bosh sahifa komponenti
function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="max-w-7xl mx-auto p-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Bizning Mahsulotlar</h1>
                <p className="text-gray-600 mt-2">Eng sara mahsulotlarni qulay narxlarda xarid qiling</p>
            </header>

            {loading ? (
                <p className="text-center text-gray-500 text-lg">Yuklanmoqda...</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Hozircha mahsulotlar mavjud emas.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
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

// Asosiy App komponenti
function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
        </div>
    );
}

export default App;

// import { Routes, Route } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import API from './services/api';
//
// // Asosiy sahifa komponenti
// function Home() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         API.get('products/')
//             .then(response => {
//                 setProducts(response.data.results || response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Mahsulotlarni olishda xatolik:", error);
//                 setLoading(false);
//             });
//     }, []);
//
//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <div className="max-w-7xl mx-auto">
//                 <header className="mb-8 text-center">
//                     <h1 className="text-4xl font-bold text-blue-600">Online Doʻkon</h1>
//                     <p className="text-gray-600 mt-2">Bosh sahifa</p>
//                 </header>
//
//                 {loading ? (
//                     <p className="text-center text-gray-500 text-lg">Yuklanmoqda...</p>
//                 ) : products.length === 0 ? (
//                     <p className="text-center text-gray-500 text-lg">Hozircha mahsulotlar mavjud emas.</p>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {products.map(product => (
//                             <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
//                                 <div>
//                                     {product.images && product.images.length > 0 ? (
//                                         <img
//                                             src={product.images[0].image.startsWith('http') ? product.images[0].image : `http://127.0.0.1:8000${product.images[0].image}`}
//                                             alt={product.title}
//                                             className="w-full h-48 object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">Rasm yo'q</div>
//                                     )}
//                                     <div className="p-4">
//                                         <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h2>
//                                         <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
//                                     </div>
//                                 </div>
//                                 <div className="p-4 pt-0 flex items-center justify-between mt-4">
//                                     <span className="text-xl font-bold text-green-600">{product.price} so'm</span>
//                                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
//                                         Sotib olish
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
//
// // Asosiy App komponenti (Marshrutlar shu yerda boshqariladi)
// function App() {
//     return (
//         <Routes>
//             <Route path="/" element={<Home />} />
//             {/* Kelgusida boshqa sahifalar qo'shiladi, masalan: /cart, /login */}
//         </Routes>
//     );
// }
//
// export default App;