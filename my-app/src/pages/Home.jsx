import React from 'react';
import CatSlider from '../components/CatSlider';

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

    return (
        <>
            <div className='absolute top-20 px-4 py-4 md:px-36 flex flex-col justify-center items-center w-full'>
                <div className='max-w-7xl'>
                    <div className='border border-gray-400 grid md:grid-cols-2 flex-nowrap'>
                        <div className='flex flex-col flex-nowrap justify-center items-center py-10 md:py-0'>
                            <div className='space-y-2 text-[#414141]'>
                                <div className='flex flex-nowrap justify-start items-center gap-2 font-medium'>
                                    <hr className='border-1 w-12' />
                                    <span className='uppercase md:text-base text-sm'>our bestsellers</span>
                                </div>
                                <div>
                                    <span className='capitalize text-3xl md:text-5xl tracking-wide' style={{ fontFamily: "Prata" }}>
                                        latest arrivals
                                    </span>
                                </div>
                                <div className='flex flex-nowrap justify-start items-center gap-2 font-medium'>
                                    <span className='uppercase font-semibold md:text-base text-sm'>shop now</span>
                                    <hr className='border-1 w-12' />
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src="/hero_img.png" alt="Hero" />
                        </div>
                    </div>

                    <CatSlider />
                </div>

                {/* Popular Products */}
                <div className='min-w-7xl py-2 flex flex-row justify-between items-center w-full'>
                    <h2 className="text-xl font-semibold capitalize">Popular products</h2>
                    <ul className='flex justify-center items-center gap-8 font-medium text-[#0009]'>
                        {productCategories.map((category, index) => (
                            <li key={index} className='cursor-pointer hover:text-black'>
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Home;
