import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    OnlineDoʻkon
                </Link>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
                        Bosh sahifa
                    </Link>
                    <Link to="/cart" className="text-gray-600 hover:text-blue-600 font-medium transition">
                        Savatcha 🛒
                    </Link>

                    {/* Agar foydalanuvchi kirgan bo'lsa Profil havolasini chiqaramiz */}
                    {token && (
                        <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium transition">
                            Profil 👤
                        </Link>
                    )}

                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                        >
                            Chiqish
                        </button>
                    ) : (
                        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Kirish
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}