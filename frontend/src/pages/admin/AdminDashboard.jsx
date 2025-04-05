import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList, CiShoppingCart } from "react-icons/ci";
import AddItems from './AddItems';
import ListItems from './ListItems';

function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('add'); // Default selected tab

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'add':
                return <AddItems />;
            case 'list':
                return <ListItems />;
            case 'orders':
                return <Orders />;
            default:
                return null;
        }
    };

    return (
        <div className='w-full h-screen flex flex-col'>
            {/* Header */}
            <div className='w-full flex justify-between items-center py-2 md:px-20 border-b border-gray-200 z-50 bg-white'>
                <img src="adminlogo.png" alt="Admin Logo" className='w-36' />
                <button
                    onClick={handleLogout}
                    className='py-2 px-6 rounded-full bg-black text-white cursor-pointer text-center font-medium'
                >
                    Logout
                </button>
            </div>

            {/* Content */}
            <div className='flex flex-1'>
                {/* Sidebar */}
                <div className='w-64 h-full border-r border-gray-300 py-6 flex justify-end'>
                    <ul className='space-y-4 mt-4'>
                        <li
                            className={`capitalize font-medium cursor-pointer border-t border-b border-l w-52 px-2 py-2 text-sm flex items-center gap-4 rounded-l-sm 
                            ${activeTab === 'add' ? 'bg-[#ffebf5] text-black outline-[#c586a5] border-[#c586a5]' : 'text-gray-700 hover:text-black'}`}
                            onClick={() => setActiveTab('add')}
                        >
                            <IoIosAddCircleOutline className='text-2xl' />Add items
                        </li>
                        <li
                            className={`capitalize font-medium cursor-pointer border-t border-b border-l w-52 px-2 py-2 text-sm flex items-center gap-4 rounded-l-sm 
                            ${activeTab === 'list' ? 'bg-[#ffebf5] text-black outline-[#c586a5] border-[#c586a5]' : 'text-gray-700 hover:text-black'}`}
                            onClick={() => setActiveTab('list')}
                        >
                            <CiViewList className='text-2xl' />List items
                        </li>
                        <li
                            className={`capitalize font-medium cursor-pointer border-t border-b border-l w-52 px-2 py-2 text-sm flex items-center gap-4 rounded-l-sm 
                            ${activeTab === 'orders' ? 'bg-[#ffebf5] text-black outline-[#c586a5] border-[#c586a5]' : 'text-gray-700 hover:text-black'}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <CiShoppingCart className='text-2xl' />Orders
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className='flex-1 py-10 px-20'>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
