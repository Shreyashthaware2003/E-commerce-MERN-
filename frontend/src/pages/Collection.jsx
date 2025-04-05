import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/util';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../app.css';

function Collection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showFilters, setShowFilters] = useState(false); // for mobile

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/product/get`);
                const fetchedProducts = Array.isArray(res.data.products)
                    ? res.data.products
                    : res.data;

                const sortedProducts = fetchedProducts.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setProducts(sortedProducts);
                setTimeout(() => setLoading(false), 1000);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'category') {
            setSelectedCategories(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        } else if (filterType === 'type') {
            setSelectedTypes(prev =>
                prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
            );
        }
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.subCategory);
        return categoryMatch && typeMatch;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] w-full">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <div className='max-w-7xl mx-auto my-[86px] flex flex-col md:flex-row border-t border-gray-300 px-4' style={{ fontFamily: "Poppins" }}>
                {/* Filter Toggle Button - Mobile */}
                <div className="md:hidden mt-4">
                    <button
                        className="w-full flex justify-between items-center bg-gray-200 p-3 rounded text-sm font-medium"
                        onClick={() => setShowFilters(prev => !prev)}
                    >
                        Filters
                        {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {/* Mobile Dropdown Filters */}
                    <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden transform ${showFilters ? 'max-h-[1000px] translate-y-0 opacity-100' : 'max-h-0 -translate-y-4 opacity-0'
                            } flex flex-col gap-4 mt-4 border p-4 bg-white shadow rounded`}
                    >
                        <div>
                            <h1 className='uppercase font-medium text-sm mb-2'>Categories</h1>
                            {['Men', 'Women', 'Kids'].map(cat => (
                                <label key={cat} className='flex items-center gap-2 text-sm text-[#374151]'>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleFilterChange('category', cat)}
                                        checked={selectedCategories.includes(cat)}
                                    />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                        <div>
                            <h1 className='uppercase font-medium text-sm mb-2'>Type</h1>
                            {['Topwear', 'Bottomwear', 'Footwear'].map(type => (
                                <label key={type} className='flex items-center gap-2 text-sm text-[#374151]'>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleFilterChange('type', type)}
                                        checked={selectedTypes.includes(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Sidebar Filters - Desktop */}
                <div className='hidden md:flex min-w-60 py-12 flex-col gap-4 sticky top-24'>
                    <h1 className='text-xl uppercase font-medium mb-4'>Filters</h1>
                    <div className='flex flex-col w-full gap-6'>
                        <div className='border border-gray-300 w-full p-4 flex flex-col gap-4'>
                            <h1 className='uppercase font-medium text-sm'>Categories</h1>
                            {['Men', 'Women', 'Kids'].map(cat => (
                                <label key={cat} className='flex items-center gap-2 text-sm text-[#374151]'>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleFilterChange('category', cat)}
                                        checked={selectedCategories.includes(cat)}
                                    />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                        <div className='border border-gray-300 w-full p-4 flex flex-col gap-4'>
                            <h1 className='uppercase font-medium text-sm'>Type</h1>
                            {['Topwear', 'Bottomwear', 'Footwear'].map(type => (
                                <label key={type} className='flex items-center gap-2 text-sm text-[#374151]'>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleFilterChange('type', type)}
                                        checked={selectedTypes.includes(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Collection */}
                <div className=' transition-all duration-500 ease-in-out transform flex flex-col  md:py-8 md:px-6 w-full'>
                    <div className='flex flex-col md:flex-row items-center gap-2 font-medium text-2xl tracking-wide md:p-4'>
                        <span className='uppercase text-gray-500'>all</span>
                        <div className='flex justify-center items-center gap-2'>
                            <span className='uppercase text-gray-700'>collections</span>
                            <hr className='border-2 w-12' />
                        </div>
                    </div>

                    <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product._id} className='w-full flex flex-col items-start md:p-4 cursor-pointer '>
                                    <div className='bg-white overflow-hidden h-fit md:h-fit'>
                                        <div className='overflow-hidden'>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full object-cover transition-transform duration-300 hover:scale-110'
                                            />
                                        </div>
                                        <div className='py-4'>
                                            <span className='block text-sm font-medium text-gray-500 mb-1'>{product.name}</span>
                                            <span className='text-gray-700 font-medium text-sm md:text-base'>${product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-center col-span-full text-gray-500'>No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Collection;
