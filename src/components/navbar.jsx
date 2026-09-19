import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    OnlineDoʻkon
                </Link>

                {/* Menyu havolalari */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
                        Bosh sahifa
                    </Link>
                    <Link to="/cart" className="text-gray-600 hover:text-blue-600 font-medium transition">
                        Savatcha 🛒
                    </Link>
                    <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Kirish
                    </Link>
                </div>
            </div>
        </nav>
    );
}