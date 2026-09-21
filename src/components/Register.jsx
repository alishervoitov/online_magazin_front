import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('register/', { username, email, password });
            alert('Muvaffaqiyatli roʻyxatdan oʻtdingiz! Endi tizimga kiring.');
            navigate('/login');
        } catch (err) {
            setError('Roʻyxatdan oʻtishda xatolik yuz berdi. Boshqa nom tanlang.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Roʻyxatdan oʻtish</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block text-gray-600 text-sm mb-1">Foydalanuvchi nomi</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 text-sm mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 text-sm mb-1">Parol</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    Roʻyxatdan oʻtish
                </button>
            </form>
            <p className="text-sm text-gray-600 mt-4 text-center">
                Akkauntingiz bormi? <Link to="/login" className="text-blue-600 hover:underline">Tizimga kiring</Link>
            </p>
        </div>
    );
}