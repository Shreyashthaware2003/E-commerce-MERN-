import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList, CiShoppingCart } from "react-icons/ci";
import AddItems from './AddItems';
import ListItems from './ListItems';
import OrderItems from './OrderItems';

function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('add');

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
                return <OrderItems />;
            default:
                return null;
        }
    };

    return (
        <div className='w-full min-h-screen flex flex-col'>
            {/* Header */}
            <div className='w-full flex justify-between items-center py-2 px-4 sm:px-6 md:px-10 border-b border-gray-200 bg-white z-50'>
                <img src="adminlogo.png" alt="Admin Logo" className='w-24 sm:w-28 md:w-36' />
                <button
                    onClick={handleLogout}
                    className='py-2 px-4 md:px-6  bg-black text-white font-medium text-sm sm:text-base cursor-pointer'
                >
                    Logout
                </button>
            </div>

            {/* Content */}
            <div className='flex flex-1 flex-col md:flex-row overflow-hidden'>
                {/* Sidebar */}
                <div className='w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-300 py-4 px-4 md:px-0 md:py-6 flex md:justify-end overflow-x-auto'>
                    <ul className='flex md:flex-col gap-2 md:gap-4 w-full md:w-auto'>
                        <li
                            className={`capitalize font-medium cursor-pointer border-t border-b border-l border-r md:border-r-0  md:w-52 px-3 py-2 text-xs md:text-sm flex items-center gap-2 md:gap-4 rounded-l-sm rounded-r-sm md:rounded-r-none
                            ${activeTab === 'add' ? 'bg-[#ffebf5] text-black border-[#c586a5]' : 'text-gray-700 hover:text-black'}`}
                            onClick={() => setActiveTab('add')}
                        >
                            <IoIosAddCircleOutline className='text-xl sm:text-2xl' />Add items
                        </li>
                        <li
                            className={`capitalize font-medium cursor-pointer border-t border-b border-l border-r md:border-r-0 md:w-52 px-3 py-2 text-xs md:text-sm flex items-center gap-2 md:gap-4 rounded-l-sm rounded-r-sm md:rounded-r-none
                            ${activeTab === 'list' ? 'bg-[#ffebf5] text-black border-[#c586a5]' : 'text-gray-700 hover:text-black'}`}
                            onClick={() => setActiveTab('list')}
                        >
                            <CiViewList className='text-xl sm:text-2xl' />List items
                        </li>
                        <li
                            className={`capitalize font-medium cursor-pointer border-t border-b border-l border-r md:border-r-0  md:w-52 px-3 py-2 text-xs md:text-sm flex items-center gap-2 md:gap-4 rounded-l-sm rounded-r-sm md:rounded-r-none
                            ${activeTab === 'orders' ? 'bg-[#ffebf5] text-black border-[#c586a5]' : 'text-gray-700 hover:text-black'}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            <CiShoppingCart className='text-xl sm:text-2xl' />Orders
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className='flex-1 py-6 px-4 sm:px-6 md:px-10 overflow-y-auto'>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
