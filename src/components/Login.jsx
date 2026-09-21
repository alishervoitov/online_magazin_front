import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('token/', { username, password });
            localStorage.setItem('token', response.data.access);
            navigate('/');
        } catch (err) {
            setError('Foydalanuvchi nomi yoki parol xato!');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tizimga kirish</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
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
                    Kirish
                </button>
            </form>
            <p className="text-sm text-gray-600 mt-4 text-center">
                Akkauntingiz yoʻqmi? <Link to="/register" className="text-blue-600 hover:underline">Roʻyxatdan oʻting</Link>
            </p>
        </div>
    );
}