import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/util';
import { toast } from 'react-hot-toast';
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

function Account() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // 👁️ state
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = isLogin
                ? { email, password }
                : { name: username, email, password };

            const endpoint = isLogin
                ? `${BACKEND_URL}/user/login`
                : `${BACKEND_URL}/user/register`;

            const res = await axios.post(endpoint, payload, { withCredentials: true });

            if (res.status === 200 || res.status === 201) {
                const token = res.data.token;
                localStorage.setItem('token', token);

                // Optional: set Axios default header
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                toast.success(isLogin ? "Login successful!" : "Account created!");
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || 'Something went wrong';
            toast.error(message);
            setError(message);
        }
    };


    return (
        <div className='absolute w-full flex justify-center items-center'>
            <div className='min-w-7xl flex flex-col justify-center items-center h-screen'>
                <div className='flex flex-col justify-center items-center gap-8'>

                    {/* Title with Toggle */}
                    <div className='flex flex-nowrap justify-center items-center gap-2'>
                        <span className='text-4xl font-semibold tracking-wider' style={{ fontFamily: "Prata, sans-serif" }}>
                            {isLogin ? "Login" : "Sign Up"}
                        </span>
                        <hr className='border-2 w-8' />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-500 font-medium text-sm">{error}</div>
                    )}

                    {/* Form */}
                    <form className='flex flex-col flex-nowrap justify-center gap-2' onSubmit={handleSubmit}>
                        <div className='flex flex-col flex-nowrap justify-center items-center gap-4'>
                            {!isLogin && (
                                <input
                                    type="text"
                                    className='border w-96 p-2'
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            )}
                            <input
                                type="email"
                                className='border w-96 p-2'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="relative w-96">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className='border w-full p-2 pr-10'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-3 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <LuEye /> : <LuEyeClosed />}
                                </button>
                            </div>
                        </div>

                        {/* Toggle Link */}
                        <span className='text-sm flex justify-between mt-2'>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                className='ml-1 text-blue-600 hover:underline'
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                }}
                            >
                                {isLogin ? "Create Account" : "Login Here"}
                            </button>
                        </span>

                        <button type="submit" className='mt-4 bg-black text-white px-6 py-2 cursor-pointer'>
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Account;
