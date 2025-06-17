import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login_bg from '../assets/bg_img/login_bg.jpg';
import Nav from './Nav';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('student'); // Default to student login
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = role === 'student' ? '/students/login/' : '/admin-users/login/';
        
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('first_name', data.first_name);
                localStorage.setItem('role', data.role);
                localStorage.setItem('student_id', data.student_id);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('phone', data.phone);
                localStorage.setItem('graduation', data.graduation);
                navigate('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <>
        <Nav />
        <div className="relative w-full h-auto">
            <div
                className="h-[80vh] bg-cover bg-center flex items-center justify-center mt-3"
                style={{ backgroundImage: `url(${login_bg})` }}
            >
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative z-10 p-6 w-4/5 md:w-11/12 lg:w-1/2 bg-opacity-80 rounded-lg shadow-lg h-full flex items-center justify-center">
                    <div className='w-full max-w-md bg-white/50 flex flex-col gap-y-3 p-6 rounded-lg shadow-lg'>
                        <div className='w-full flex flex-row'>
                            <button 
                                className={`w-1/2 text-center text-xl font-bold py-4 transition border-r border-gray-500 ${role === 'student' ? 'bg-green-400' : 'bg-green- 300 hover:bg-green-400'}`} 
                                onClick={() => setRole('student')}
                            >
                                Student Login
                            </button>
                            <button 
                                className={`w-1/2 text-center text-xl font-bold py-4 transition border-l border-gray-500 ${role === 'admin' ? 'bg-blue-400' : 'bg-blue- 300 hover:bg-blue-400'}`} 
                                onClick={() => setRole('admin')}
                            >
                                Admin Login
                            </button>
                        </div>
                        {error && <p className='text-red-500'>{error}</p>}
                        <label className="text-black">Email:</label>
                        <input
                            type="text"
                            className='bg-white text-black border border-gray-400 px-3 py-2 rounded-lg'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label className="text-black">Password:</label>
                        <input
                            type="password"
                            className='bg-white text-black border border-gray-400 px-3 py-2 rounded-lg'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={handleLogin}
                            className='bg-gray-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-600'>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;