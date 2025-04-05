import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/util';
import toast from 'react-hot-toast';

function ListItems() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/product/get`);
            console.log("API Response:", res.data); // 👈 log the response
            setProducts(res.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const editProduct = (id) => {
        console.log('Edit product with ID:', id);
        // Implement edit logic or navigation
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
        <div className='flex flex-col gap-6 w-full'>
            <h2 className='text-xl font-semibold text-gray-700'>All Products List</h2>

            {/* Loading or Error */}
            {loading ? (
                <p className='text-gray-500 text-center'>Loading products...</p>
            ) : error ? (
                <p className='text-red-500 text-center'>{error}</p>
            ) : (
                <>
                    {/* Table Headers */}
                    <div className='grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 font-medium text-gray-600 rounded-md'>
                        <span>Image</span>
                        <span>Name</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span>Action</span>
                    </div>

                    {/* Products List */}
                    <div className='flex flex-col gap-4'>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className='grid grid-cols-5 gap-4 px-4 py-3 items-center border border-gray-200 rounded-md'
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className='w-20 h-20 object-cover rounded-md'
                                    />
                                    <span className='text-gray-700'>{product.name}</span>
                                    <span className='text-gray-600'>{product.category}</span>
                                    <span className='text-green-600 font-medium'>₹{product.price}</span>
                                    <div className='flex gap-2'>
                                        <button
                                            type="button"
                                            className='px-3 py-1 bg-blue-500 text-white rounded-md text-sm cursor-pointer'
                                            onClick={() => editProduct(product._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className='px-3 py-1 bg-red-500 text-white rounded-md text-sm cursor-pointer'
                                            onClick={() => deleteProduct(product._id)}
                                        >
                                            Delete
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
