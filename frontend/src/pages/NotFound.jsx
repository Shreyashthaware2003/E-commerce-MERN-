import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <div className='flex justify-center items-end gap-1'>
                <h1 className="text-9xl font-bold ">404</h1>
                <div className='w-3 h-3 bg-[#ffa5d3] rounded-full'></div>
            </div>
            <p className="text-xl mt-4 text-gray-600">Oops! Page not found.</p>
            <Link to="/home" className="mt-6 text-blue-500 underline hover:text-blue-700">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
