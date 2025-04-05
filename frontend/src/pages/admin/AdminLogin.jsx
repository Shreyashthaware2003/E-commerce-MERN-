import React, { useState } from 'react';
import { BACKEND_URL } from '../../../utils/util';
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function AdminLogin() {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passVisible, setPassVisible] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard'; // fallback to dashboard

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${BACKEND_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminInfo', JSON.stringify(data));

            toast.success('Admin login successful ✅');
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white w-full flex justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-start px-8 py-6 shadow-md max-w-xl rounded-md'>
                <h1 className='capitalize font-bold text-black text-2xl mb-4'>admin panel</h1>

                <form onSubmit={handleLogin}>
                    <div className='flex flex-col min-w-72 mb-3'>
                        <span className='capitalize text-gray-700 font-medium mb-2 text-sm'>Email address</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            required
                            placeholder='your@email.com'
                        />
                    </div>

                    <div className='flex flex-col w-full min-w-72 mb-3 relative'>
                        <span className='capitalize text-gray-700 font-medium mb-2 text-sm'>Password</span>
                        <input
                            type={passVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none pr-10'
                            required
                            placeholder='Enter your password'

                        />
                        <div
                            className='absolute right-3 bottom-3 text-xl cursor-pointer text-gray-600'
                            onClick={() => setPassVisible(!passVisible)}
                        >
                            {passVisible ? <TbEye /> : <TbEyeClosed />}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-black text-white text-center py-2 rounded mt-2 cursor-pointer font-medium'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
