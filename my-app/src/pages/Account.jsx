import React, { useState } from 'react';

function Account() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='absolute w-full flex justify-center items-center'>
            <div className='min-w-7xl flex flex-col justify-center items-center h-screen'>
                <div className='flex flex-col justify-center items-center gap-8'>

                    {/* Title with Toggle */}
                    <div className='flex flex-nowrap justify-center items-center gap-2'>
                        <span className='text-4xl font-semibold tracking-wider' style={{fontFamily:"Prata, sans-serif"}}>{isLogin ? "Login" : "Sign Up"}</span>
                        <hr className='border-2 w-8' />
                    </div>

                    {/* Form */} 
                    <div className='flex flex-col flex-nowrap justify-center gap-2'>
                        <div className='flex flex-col flex-nowrap justify-center items-center gap-4'>
                            {!isLogin && <input type="text" className='border w-96 p-2' placeholder='Username' />}
                            <input type="email" className='border w-96 p-2' placeholder='Email' />
                            <input type="password" className='border w-96 p-2' placeholder='Password' />
                        </div>

                        {/* Toggle Link */}
                        <span className='text-sm flex justify-between'>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                className=' ml-1 cursor-pointer'
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? "Create Account" : "Login Here"}
                            </button>
                        </span>
                    </div>
                    <button className='bg-black cursor-pointer text-white px-6 py-2'>{isLogin?'Sign In':'Sign Up'}</button>
                </div>
            </div>
        </div>
    );
}

export default Account;
