import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Select from './select/Select';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const timeoutRef = useRef(null);
    const location = useLocation(); // Get the current route

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropdownOpen(false);
        }, 400);
    };

    return (
        <header className='w-full bg-white fixed top-0 left-0 z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center p-5'>
                {/* Logo */}
                <Link to="/">
                    <img src="/logo.png" alt="logo" className='w-36 cursor-pointer' />
                </Link>

                {/* Navigation Menu for Large Screens */}
                <nav className='hidden md:flex items-center justify-center gap-2 uppercase text-sm list-none font-medium text-gray-700 tracking-wide'>
                    {["Home", "Collection", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <Link
                                to={`/${item.toLowerCase()}`}
                                className={`cursor-pointer px-3 py-2 transition ${location.pathname === `/${item.toLowerCase()}` ? "border-b-2 font-bold" : "hover:text-gray-900"
                                    }`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                    <Link to={'/admin/login'} className='border border-gray-300 p-2 rounded-full text-xs capitalize '>admin panel</Link>
                </nav>

                {/* Icons and Search Bar */}
                <div className='flex items-center gap-4 text-2xl'>
                    <div className='hidden md:flex items-center rounded-md '>
                        <FiSearch className='cursor-pointer' />
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
                    {["Home", "Collection", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <Link
                                to={`/${item.toLowerCase()}`}
                                className={`cursor-pointer px-3 py-2 rounded-md transition ${location.pathname === `/${item.toLowerCase()}` ? "text-blue-600 font-bold" : "hover:text-gray-900"
                                    }`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                    <div className='flex items-center border border-gray-400 rounded-md px-2 w-full max-w-xs'>
                        <Select />
                        <input
                            type="text"
                            className="text-sm focus:outline-none p-2 w-full"
                            placeholder="Search items here..."
                        />
                        <FiSearch className='cursor-pointer' />
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
