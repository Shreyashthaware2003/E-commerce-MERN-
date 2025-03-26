import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function Sidebar({ children }) {  // Accept children (main content)
    const categories = [
        { name: "Fashion", img: "/categories/fashion.png" },
        { name: "Electronics", img: "/categories/electronics.png" },
        { name: "Bags", img: "/categories/bag.png" },
        { name: "Footwear", img: "/categories/footwear.png" },
        { name: "Groceries", img: "/categories/groceries.png" },
        { name: "Beauty", img: "/categories/beauty.png" },
        { name: "Wellness", img: "/categories/wellness.png" },
        { name: "Jewellery", img: "/categories/jewellery.png" },
    ];

    const [price, setPrice] = useState(60000);
    const [isOpen, setIsOpen] = useState(false);

    const handleSliderChange = (event, newValue) => {
        setPrice(newValue);
    };

    return (
        <div className={`flex flex-col md:flex-row transition-all duration-300 w-full`}>
            {/* Sidebar */}
            <div className={`md:w-64  md:h-auto transition-all duration-300 py-4 md:space-y-6`}>
                <h1 className=" uppercase font-medium tracking-wide text-xl md:text-2xl cursor-pointer flex items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Filters
                    <span className="inline md:hidden">
                        {isOpen ? <MdKeyboardArrowUp className='text-xl' /> : <MdKeyboardArrowDown className='text-xl' />}
                    </span>
                </h1>

                {/* Sidebar Content */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-6 bg-white`}>
                    {/* Categories Section */}
                    <div className="w-72 md:w-64 border border-gray-300 p-4">
                        <h1 className="uppercase text-sm font-semibold tracking-wide mb-4">Categories</h1>
                        <div className='h-28 overflow-y-scroll'>
                            <ul className="space-y-3">
                                {categories.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 cursor-pointer border border-gray-200 hover:border-gray-400 duration-300 p-2 rounded-md">
                                        <img src={item.img} alt={item.name} className="w-8 h-8 object-cover" />
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Price Range Slider */}
                    <div className="w-72 md:w-64 border border-gray-300 p-4">
                        <h1 className='uppercase text-sm font-semibold tracking-wide mb-4'>Filter by price</h1>
                        <Box sx={{ width: 200 }}>
                            <Slider
                                size="small"
                                value={price}
                                min={100}
                                max={60000}
                                onChange={handleSliderChange}
                                aria-label="Price Range"
                                color='black'
                            />
                        </Box>

                        <div className='flex justify-between text-sm font-medium'>
                            <span>From: <span className='text-red-500'>Rs. 100</span></span>
                            <span>To: <span className='text-green-500'>Rs. {price}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`w-full transition-all duration-300 ${isOpen ? "mt-6" : ""} md:mt-0`}>
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
