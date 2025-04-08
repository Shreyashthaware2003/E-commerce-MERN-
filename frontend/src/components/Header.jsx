import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import Select from './select/Select';
import { BACKEND_URL } from '../../utils/util';
import { toast } from 'react-hot-toast';
import { useCart } from '../cart/CartContext';
import { BsCartCheck } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount, fetchCartCount } = useCart();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setIsLoggedIn(false);
                    return;
                }

                const res = await axios.get(`${BACKEND_URL}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                if (res.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
        fetchCartCount(); // Update cart count on route change
    }, [location]);

    // 🔻 Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setDropdownOpen(false);
        toast.success("User logged out successfully");
        navigate("/account");
    };

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeMenuOnNav = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setMenuOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <header className='w-full bg-white fixed top-0 left-0 z-50' style={{ fontFamily: "Poppins" }}>
            <div className='max-w-7xl mx-auto flex justify-between items-center p-5'>
                <Link to="/">
                    <img src="/logo.png" alt="logo" className='w-36 cursor-pointer' />
                </Link>

                <nav className='hidden md:flex items-center justify-center gap-2 uppercase text-sm list-none font-medium text-gray-700 tracking-wide'>
                    {["Home", "Collection", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <Link
                                to={`/${item.toLowerCase()}`}
                                className={`cursor-pointer px-3 py-2 transition ${location.pathname === `/${item.toLowerCase()}` ? "border-b-2 font-bold" : "hover:text-gray-900"}`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                    <Link to={'/admin/login'} className='border border-gray-300 p-2 rounded-full text-xs capitalize'>admin panel</Link>
                </nav>

                <div className='flex items-center gap-4 text-2xl relative'>
                    {isLoggedIn ? (
                        <div className='relative flex justify-center items-center' ref={dropdownRef}>
                            <button onClick={toggleDropdown}>
                                <GoPerson className='cursor-pointer' />
                            </button>
                            {dropdownOpen && (
                                <ul className='absolute top-10 right-0 bg-slate-100 text-gray-700 text-sm shadow rounded w-32 p-2 z-50'>
                                    <li className='cursor-pointer p-2 hover:text-black flex flex-nowrap items-center gap-2 font-medium' onClick={() => {
                                        navigate("/orders");
                                        setDropdownOpen(false);
                                    }}>
                                        <BsCartCheck className='text-xl' /> Orders
                                    </li>
                                    <li className='cursor-pointer p-2 hover:text-red-500 font-medium flex flex-nowrap items-center gap-2' onClick={handleLogout}>
                                        <CiLogout className='text-xl' />Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link to="/account">
                            <GoPerson className='cursor-pointer' />
                        </Link>
                    )}

                    <div className="relative">
                        <Link to="/cart" className="relative block">
                            <HiOutlineShoppingBag className="text-2xl" />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] min-w-[16px] h-[16px] px-[4px] flex items-center justify-center rounded-full text-xs">
                                {cartCount}
                            </span>
                        </Link>
                    </div>

                    <button className='md:hidden z-50 relative' onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? "" : <AiOutlineMenu />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 bg-opacity-30 z-30" onClick={() => setMenuOpen(false)} />
            )}

            <div className={`fixed top-0 right-0 w-full h-screen bg-white shadow-lg list-none transition-transform duration-300 ease-in-out z-40 transform 
                ${menuOpen ? 'translate-x-0' : 'translate-x-full'} 
                md:hidden`}
            >
                <div className="flex justify-between items-center py-5 px-6">
                    <h1 className='uppercase font-mono text-4xl'>Menu</h1>
                    <button onClick={() => setMenuOpen(false)} className="text-2xl">
                        <AiOutlineClose />
                    </button>
                </div>
                <hr className='w-full' />

                <div className="flex flex-col items-start gap-2 px-6 py-10 font-mono text-2xl">
                    {["Home", "Collection", "About", "Contact"].map((item) => (
                        <li key={item}>
                            <Link
                                to={`/${item.toLowerCase()}`}
                                onClick={closeMenuOnNav}
                                className={`cursor-pointer block px-3 py-2 rounded-md transition ${location.pathname === `/${item.toLowerCase()}` ? "text-gray-700" : "hover:text-black"}`}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Header;
