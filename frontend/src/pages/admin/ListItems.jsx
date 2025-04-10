import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/util';
import toast from 'react-hot-toast';
import { MdDeleteOutline } from "react-icons/md";

function ListItems() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/product/get`);
            console.log("API Response:", res.data);
            setProducts((res.data || []).reverse());
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const editProduct = (id) => {
        console.log('Edit product with ID:', id);
    };

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`${BACKEND_URL}/product/delete/${id}`);
            setProducts(products.filter(product => product._id !== id));
            toast.success('Product deleted successfully!');
        } catch (err) {
            console.error('Error deleting product:', err);
            toast.error('Failed to delete product.');
        }
    };

    return (
        <div className='flex flex-col gap-6 w-full p-4'>
            <h2 className='text-xl font-semibold text-gray-700 text-center sm:text-left'>
                All Products List
            </h2>

            {loading ? (
                <p className='text-gray-500 text-center'>Loading products...</p>
            ) : error ? (
                <p className='text-red-500 text-center'>{error}</p>
            ) : (
                <>
                    <div className='hidden sm:grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 font-medium text-gray-600 rounded-md '>
                        <span>Image</span>
                        <span>Name</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span>Action</span>
                    </div>

                    <div className='flex flex-col gap-4 h-[60vh] overflow-y-scroll'>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className='grid md:grid-cols-5  md:gap-4 px-4 py-3 items-center border border-gray-200 rounded-md md:text-left'
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className='w-24 h-24 object-cover '
                                    />
                                    <span className='text-gray-700'>{product.name}</span>
                                    <span className='text-gray-600'>{product.category}</span>
                                    <span className='text-green-600 font-medium hidden md:inline'>₹{product.price}</span>
                                    <div className='flex justify-between items-center gap-2 mt-2 md:mt-0'>
                                    <span className='text-green-600 font-medium inline md:hidden'>₹{product.price}</span>
                                        <button
                                            type="button"
                                            className='px-4 py-2 bg-black text-white text-sm cursor-pointer font-medium flex items-center gap-2'
                                            onClick={() => deleteProduct(product._id)}
                                        >
                                            Delete<MdDeleteOutline className='text-xl' />
                                        </button>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <p className='text-gray-500 text-center'>No products available</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ListItems;
