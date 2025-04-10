import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/util';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const OrderItems = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                toast.error("Admin token not found. Please log in as admin.");
                setLoading(false);
                return;
            }

            const res = await axios.get(`${BACKEND_URL}/order/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOrders(res.data.orders || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (orderId) => {
        const confirmed = window.confirm("Are you sure you want to delete this order?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await axios.delete(`${BACKEND_URL}/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Order deleted successfully");
            fetchOrders(); // Refresh list
        } catch (err) {
            console.error("Error deleting order:", err);
            toast.error("Failed to delete order");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-4 w-full flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-700 text-center sm:text-left">All Orders</h2>

            {loading ? (
                <p className="text-gray-500 text-center">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-500 text-center">No orders available</p>
            ) : (
                <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto ">
                    {orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-lg p-4 relative ">

                            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h3>
                                    <p className="text-sm text-gray-600">User: {order.user?.name || 'Unknown'}</p>
                                    <p className="text-sm text-gray-600">Email: {order.user?.email || 'N/A'}</p>
                                    <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                        {order.paymentMethod.toLowerCase() === 'cod' || order.paymentMethod.toLowerCase() === 'cash on delivery'
                                            ? (order.status || 'Pending')
                                            : (order.status || 'Paid')}
                                    </span>

                                </div>
                            </div>

                            <div className="text-sm text-gray-700">
                                <p className="font-medium">Items:</p>
                                <ul className="list-none mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {order.items?.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-4 border p-2 rounded-md">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover  "
                                            />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className='w-full flex justify-between items-center py-2'>
                                    <p className="mt-4 font-semibold text-green-600">Total: ₹{order.totalPrice}</p>
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className=" right-2 bg-black text-white font-medium px-4 py-2 cursor-pointer flex justify-center items-center gap-2 flex-nowrap"
                                        title="Delete Order"
                                    >
                                        Delete Order<MdDelete size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderItems;
