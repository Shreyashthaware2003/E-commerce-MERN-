import React, { useState, useRef } from 'react';
import { CiSearch } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Select from './select/Select';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const timeoutRef = useRef(null); // Reference for timeout

    // Function to open dropdown immediately
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Prevents closing if mouse enters again quickly
        }
        setDropdownOpen(true);
    };

    // Function to delay closing dropdown for 1 second
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropdownOpen(false);
        }, 400); // 1-second delay before closing
    };

    return (
        <header className='w-full bg-white fixed top-0 left-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center p-4'>
                {/* Logo */}
                <img src="/logo.svg" alt="logo" className='w-36 cursor-pointer' />

                {/* Navigation Menu for Large Screens */}
                <nav className='hidden md:flex gap-8 uppercase text-sm list-none'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>Collection</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Contact</li>
                </nav>

                {/* Icons and Search Bar */}
                <div className='flex items-center gap-4 text-2xl'>
                    <div className='hidden md:flex items-center border border-gray-400 rounded-md px-2'>
                        <Select />
                        <input
                            type="text"
                            className="text-sm focus:outline-none p-2"
                            placeholder="Search items here..."
                        />
                        <CiSearch className='cursor-pointer' />
                    </div>

                    {/* Account Dropdown */}
                    <div 
                        className='relative'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <GoPerson className='cursor-pointer' />
                        {dropdownOpen && (
                            <ul className='absolute top-10 right-0 text-sm bg-slate-100 text-gray-500 rounded shadow w-28 py-2 px-2 font-medium space-y-2'>
                                <li className='cursor-pointer hover:text-black'>Orders</li>
                                <li className='cursor-pointer hover:text-black'>Logout</li>
                            </ul>
                        )}
                    </div>

                    <HiOutlineShoppingBag className='cursor-pointer' />

                    {/* Mobile Menu Button */}
                    <button className='md:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className='md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-md list-none'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>Collection</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Contact</li>
                    <div className='flex items-center border border-gray-400 rounded-md px-2 w-full max-w-xs'>
                        <Select />
                        <input
                            type="text"
                            className="text-sm focus:outline-none p-2 w-full"
                            placeholder="Search items here..."
                        />
                        <CiSearch className='cursor-pointer' />
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
