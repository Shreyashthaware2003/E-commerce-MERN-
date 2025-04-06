import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/util';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../app.css';
import { useLocation } from 'react-router-dom';
import { IoSearch, IoCloseSharp } from "react-icons/io5";

function Collection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const location = useLocation();
    const [showSearch, setShowSearch] = useState(location.state?.showSearch || false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/product/get`);
                const fetched = Array.isArray(res.data.products) ? res.data.products : res.data;
                const sorted = fetched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setProducts(sorted);
                setTimeout(() => setLoading(false), 1000);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (filterType, value) => {
        const updater = filterType === 'category' ? setSelectedCategories : setSelectedTypes;
        updater(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.subCategory);
        const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && typeMatch && (!searchTerm || searchMatch);
    });

    const renderFilterGroup = (title, options, filterType, selected) => (
        <div className='border border-gray-300 w-full p-4 flex flex-col gap-4'>
            <h1 className='uppercase font-medium text-sm'>{title}</h1>
            {options.map(opt => (
                <label key={opt} htmlFor={opt} className='flex items-center gap-2 text-sm text-[#374151]'>
                    <input
                        id={opt}
                        type="checkbox"
                        onChange={() => handleFilterChange(filterType, opt)}
                        checked={selected.includes(opt)}
                    />
                    <span>{opt}</span>
                </label>
            ))}
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] w-full">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto my-[86px] flex flex-col md:flex-row border-t border-gray-300 px-4 font-poppins'>
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mt-4">
                <button
                    className="w-full flex justify-between items-center bg-gray-200 p-3 rounded text-sm font-medium"
                    onClick={() => setShowFilters(prev => !prev)}
                >
                    Filters {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                {/* Mobile Filters */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden transform ${showFilters ? 'max-h-[1000px] translate-y-0 opacity-100' : 'max-h-0 -translate-y-4 opacity-0'} flex flex-col gap-4 mt-4 p-2 md:p-4 bg-white`}>
                    {renderFilterGroup('Categories', ['Men', 'Women', 'Kids'], 'category', selectedCategories)}
                    {renderFilterGroup('Type', ['Topwear', 'Bottomwear', 'Footwear'], 'type', selectedTypes)}
                </div>
            </div>

            {/* Desktop Sidebar Filters */}
            <aside className='hidden md:flex min-w-60 py-12 flex-col gap-4 sticky top-24'>
                <h1 className='text-xl uppercase font-medium mb-4'>Filters</h1>
                <div className='flex flex-col w-full gap-6'>
                    {renderFilterGroup('Categories', ['Men', 'Women', 'Kids'], 'category', selectedCategories)}
                    {renderFilterGroup('Type', ['Topwear', 'Bottomwear', 'Footwear'], 'type', selectedTypes)}
                </div>
            </aside>

            {/* Product Grid */}
            <section className='transition-all duration-500 ease-in-out transform flex flex-col md:py-8 md:px-6 w-full'>
                {/* Search Bar */}
                <div className="mb-6 w-full flex justify-end items-center gap-2 relative h-12 overflow-visible">

                    {/* Sliding Search Input */}
                    <div
                        className={`flex items-center gap-2 transition-all duration-500 ease-in-out overflow-hidden ${showSearch ? 'translate-x-0 opacity-100 ml-2' : 'translate-x-10 opacity-0 pointer-events-none'
                            }`}
                    >
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[250px] px-4 py-2 border border-gray-300 rounded outline-none transition-all"
                        />
                    </div>
                    {/* Search Button with toggle text */}
                    <button
                        onClick={() => {
                            setShowSearch((prev) => !prev);
                            if (showSearch) setSearchTerm('');
                        }}
                        className="flex items-center justify-center w-28 gap-2 text-white bg-black cursor-pointer px-4 py-2 rounded transition-all"
                    >
                        {showSearch ?
                            (
                                <>
                                    <div className='flex justify-center items-center gap-2 font-medium'>
                                        Close <IoCloseSharp size={22} />
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className='flex justify-center items-center gap-2 font-medium'>
                                        Search <IoSearch size={22} />
                                    </div>
                                </>
                            )
                        }
                    </button>
                </div>


                {/* Collection Heading */}
                <div className='flex flex-col md:flex-row items-center gap-2 font-medium text-2xl tracking-wide md:p-4 mb-4'>
                    <span className='uppercase text-gray-500'>all</span>
                    <div className='flex justify-center items-center gap-2'>
                        <span className='uppercase text-gray-700'>collections</span>
                        <hr className='border-2 w-12' />
                    </div>
                </div>

                {/* Product Grid */}
                <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product._id} className='w-full flex flex-col items-start md:p-4 cursor-pointer'>
                                <div className='bg-white overflow-hidden'>
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
                        <p className='text-center col-span-full text-gray-500'>No products found. Try adjusting your filters.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Collection;
