import React, { useEffect, useState } from 'react';
import { RiExchangeFundsFill } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/util';
import '../app.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/product/get`);
                const fetchedProducts = Array.isArray(res.data.products)
                    ? res.data.products
                    : res.data;

                const sorted = fetchedProducts.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setProducts(sorted.slice(0, 8)); // 👈 Only 8 products
                setTimeout(() => setLoading(false), 1000);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='absolute top-20 px-4 md:px-36 flex flex-col justify-center items-center w-full'>
            <div className='max-w-7xl'>

                {/* Hero Section */}
                <div className='border border-gray-400 grid md:grid-cols-2 my-14 md:my-20'>
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

                {/* Collection Section */}
                <div className='flex flex-col flex-nowrap justify-center items-center'>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-2 font-medium text-2xl md:text-3xl tracking-wide mb-4' style={{ fontFamily: "Poppins" }}>
                        <span className='uppercase text-gray-500'>latest</span>
                        <div className='flex justify-center items-center gap-2'>
                            <span className='uppercase text-gray-700'>collection</span>
                            <hr className='border-2 w-12' />
                        </div>
                    </div>
                    <span className='font-medium text-gray-900 text-sm md:text-base text-center'>
                        Unveiling our latest collection — crafted for comfort, styled for confidence, and made to stand out in every moment.
                    </span>

                    {/* Product Grid */}
                    <div className='my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center md:h-[60vh] w-full">
                                <div className="loader"></div>
                            </div>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <Link to={`/product/${product._id}`} key={product._id} className='w-full flex flex-col items-start p-4 cursor-pointer'>
                                    <div className='bg-white overflow-hidden h-[230px] md:h-[360px] w-full'>
                                        <div className='overflow-hidden'>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full object-cover transition-transform duration-300 hover:scale-110'
                                            />
                                        </div>
                                        <div className='py-4'>
                                            <span className='block text-sm font-medium text-gray-500 mb-1'>{product.name}</span>
                                            <span className='text-gray-700 font-medium'>${product.price}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className='text-center col-span-full text-gray-500'>No products found.</p>
                        )}
                    </div>

                    <Link to={'/collection'} className='bg-black text-white px-4 py-2'>
                        Explore More
                    </Link>
                </div>
            </div>

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
