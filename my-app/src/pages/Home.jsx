import React, { useState } from 'react';
import CatSlider from '../components/CatSlider';
import { RiExchangeFundsFill } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Products from '../components/Products';

function Home() {
    const productCategories = [
        "Fashion",
        "Electronics",
        "Bags",
        "Footwear",
        "Groceries",
        "Beauty",
        "Wellness",
        "Jewellery",
        "Mug",
    ];

    const [activeCategory, setActiveCategory] = useState(productCategories[0]);

    // Dummy products for each category (replace with real data)
    const products = {
        Fashion: ["Shirt", "Jeans", "Jacket"],
        Electronics: ["Laptop", "Smartphone", "Headphones"],
        Bags: ["Handbag", "Backpack", "Wallet"],
        Footwear: ["Sneakers", "Sandals", "Boots"],
        Groceries: ["Rice", "Vegetables", "Fruits"],
        Beauty: ["Lipstick", "Foundation", "Perfume"],
        Wellness: ["Yoga Mat", "Supplements", "Skincare"],
        Jewellery: ["Necklace", "Earrings", "Ring"],
        Mug: ["Coffee Mug", "Tea Cup", "Travel Mug"],
    };

    // Dummy image paths for each category (replace with real paths)
    const productImages = {
        Fashion: "/products/p2.img",
        Electronics: "/products/electronics.png",
        Bags: "/products/bags.png",
        Footwear: "/products/footwear.png",
        Groceries: "/products/groceries.png",
        Beauty: "/products/beauty.png",
        Wellness: "/products/wellness.png",
        Jewellery: "/products/jewellery.png",
        Mug: "/products/mug.png",
    };

    return (
        <div className='absolute top-20 px-4 py-4 md:px-36 flex flex-col justify-center items-center w-full'>
            <div className='max-w-7xl'>
                {/* Hero Section */}
                <div className='border border-gray-400 grid md:grid-cols-2'>
                    <div className='flex flex-col justify-center items-center py-10 md:py-0'>
                        <div className='space-y-2 text-[#414141]'>
                            <div className='flex items-center gap-2 font-medium'>
                                <hr className='border-1 w-12' />
                                <span className='uppercase md:text-base text-sm'>our bestsellers</span>
                            </div>
                            <div>
                                <span className='capitalize text-3xl md:text-5xl tracking-wide' style={{ fontFamily: "Prata" }}>
                                    latest arrivals
                                </span>
                            </div>
                            <div className='flex items-center gap-2 font-medium'>
                                <span className='uppercase font-semibold md:text-base text-sm'>shop now</span>
                                <hr className='border-1 w-12' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="/hero_img.png" alt="Hero" className="w-full" />
                    </div>
                </div>

                <CatSlider category={activeCategory} />
            </div>

            {/* Popular Products Section */}
            <div className="max-w-xs md:max-w-7xl md:pt-4 md:pb-4 pt-2 pb-4 flex flex-col md:flex-row justify-between w-full">
                <h2 className="text-xl font-semibold capitalize">Popular products</h2>
                <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
                    <ul className="flex gap-2 font-medium text-[#0009] whitespace-nowrap px-2 no-scrollbar">
                        {productCategories.map((category, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveCategory(category)}
                                className={`cursor-pointer text-sm md:text-base px-4 py-1 rounded-md ${activeCategory === category ? 'bg-black text-white' : ''
                                    }`}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Render Products Component */}
            <Products activeCategory={activeCategory} />

            {/* Bottom Section */}
            <div className='w-full max-w-7xl grid md:grid-cols-3 px-4 gap-4 py-10'>
                <div className='flex flex-col justify-center items-center p-10 gap-4'>
                    <RiExchangeFundsFill className='text-6xl' />
                    <div className='flex flex-col justify-center items-center text-center'>
                        <span className='font-semibold'>Easy Exchange Policy</span>
                        <span className='text-gray-400'>We offer a hassle-free exchange policy</span>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-10 gap-4'>
                    <MdOutlineVerified className='text-6xl' />
                    <div className='flex flex-col justify-center items-center text-center'>
                        <span className='font-semibold'>7 Days Return Policy</span>
                        <span className='text-gray-400'>We provide a 7-day free return policy</span>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center p-10 gap-4'>
                    <BiSupport className="text-6xl" />
                    <div className='flex flex-col justify-center items-center text-center'>
                        <span className='font-semibold'>Best Customer Support</span>
                        <span className='text-gray-400'>We provide 24/7 customer support</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
