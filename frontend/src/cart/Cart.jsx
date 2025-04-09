import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/util';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(res.data.cart?.items || []);
        } catch (err) {
            console.error('Error fetching cart:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`${BACKEND_URL}/cart/remove/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch (err) {
            console.error('Error removing item:', err.response?.data || err.message);
        }
    };

    const updateQuantity = async (itemId, newQty) => {
        if (newQty < 1) return;

        try {
            await axios.put(`${BACKEND_URL}/cart/update/${itemId}`, {
                quantity: newQty,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch (err) {
            console.error('Error updating quantity:', err.response?.data || err.message);
        }
    };

    const handleProceedToCheckout = () => {
        const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + 10;
        navigate(`/place-order?total=${total.toFixed(2)}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] w-full">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-[95px]  px-4">
            <div className="text-lg md:text-2xl font-medium mb-4 uppercase flex flex-nowrap items-center gap-2">
                <span className='text-gray-500'>my</span>
                <span className='text-gray-700'>cart</span>
                <hr className='border-2 w-8 md:w-12' />
            </div>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="flex flex-col lg:flex-row justify-between gap-2 md:gap-8">
                    <div className="space-y-6 overflow-y-auto w-full lg:w-3/4 max-h-[30vh] md:max-h-[70vh] pr-[4px]">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex  sm:flex-row items-center justify-between border p-4 rounded-lg">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div>
                                        <h2 className="font-semibold">{item.product.name}</h2>
                                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="cursor-pointer bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                                                <FaMinus size={12} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="cursor-pointerbg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                                                <FaPlus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
                                    <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm cursor-pointer">
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='w-full lg:w-1/4 h-fit mt-4 md:mt-10 bg-white p-6 rounded-lg shadow-md'>
                        <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-medium">${cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Shipping Fee</span>
                            <span className="font-medium">$10.00</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700 font-semibold">Total</span>
                            <span className="font-semibold text-lg">${(cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + 10).toFixed(2)}</span>
                        </div>
                        <button onClick={handleProceedToCheckout} className="w-full bg-black text-white py-2 cursor-pointer transition duration-300 mt-4">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
