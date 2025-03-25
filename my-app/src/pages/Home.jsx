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
                <div className="max-w-xs md:min-w-7xl md:pt-4 md:pb-4 pt-2 pb-4 flex flex-col md:flex-row justify-between">
                    <h2 className="text-xl font-semibold capitalize">Popular products</h2>
                    <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
                        <ul className="flex gap-6 font-medium text-[#0009] whitespace-nowrap px-2 no-scrollbar">
                            {productCategories.map((category, index) => (
                                <li key={index} className="cursor-pointer hover:text-black text-sm md:text-base px-2 py-1">
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;
