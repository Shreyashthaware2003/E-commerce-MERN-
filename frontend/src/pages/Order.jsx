import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BACKEND_URL } from "../../utils/util";
import { useNavigate } from "react-router-dom";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${BACKEND_URL}/order/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(res.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="text-center mt-8">Loading orders...</div>;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto my-[95px]" style={{ fontFamily: "Poppins" }}>
            <div className="text-lg md:text-2xl font-medium mb-4 uppercase flex items-center gap-2">
                <span className="text-gray-500">my</span>
                <span className="text-gray-700">orders</span>
                <hr className="border-2 w-8 md:w-12" />
            </div>

            <div className="max-h-[60vh] md:max-h-[58vh] overflow-y-auto p-4 ">

                {orders.length === 0 ? (
                    <p className="text-gray-500">No orders placed yet.</p>
                ) : (
                    [...orders].reverse().map((order, index) => (
                        <div key={index} className="bg-white p-4 mb-8 shadow-sm rounded-md">
                            {/* Order Summary */}
                            <div className="flex justify-between flex-col md:flex-row gap-4 text-sm md:text-base mb-3">
                                <div>
                                    <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                                    <p><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex flex-col md:items-end">
                                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 bg-blue-100 text-blue-800">
                                        {order.paymentMethod}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {order.paymentMethod === "razorpay" ? (
                                            <AiOutlineCheckCircle className="text-green-500 text-lg" />
                                        ) : (
                                            <AiOutlineCloseCircle className="text-red-500 text-lg" />
                                        )}
                                        <p>{order.paymentMethod === "razorpay" ? "Paid" : "Cash on Delivery"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Grid layout for Items + Address + Total */}
                            <div className="flex flex-col lg:flex-row justify-between gap-6 border-t pt-4">
                                {/* Items List */}
                                <div className="flex-1">
                                    {order.items?.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-4 mb-4 cursor-pointer"
                                            onClick={() => {
                                                if (item.product) {
                                                    navigate(`/product/${item.product}`);
                                                } else {
                                                    console.warn("Missing product ID in item:", item);
                                                }
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-md border"
                                            />
                                            <div className="text-sm md:text-base">
                                                <p className="font-semibold">{item.name}</p>
                                                <p>Size: {item.size}</p>
                                                <p>Qty: {item.quantity}</p>
                                                <p>Price: ₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Address + Total */}
                                <div className="flex flex-col gap-4 lg:w-[300px]">
                                    <div>
                                        <h2 className="font-semibold mb-1">Shipping Address</h2>
                                        <div className="text-sm md:text-base text-gray-700">
                                            <p>{order.firstName} {order.lastName}</p>
                                            <p>{order.street}</p>
                                            <p>{order.city}, {order.state} - {order.zipcode}</p>
                                            <p>{order.country}</p>
                                            <p>Phone: {order.phone}</p>
                                        </div>
                                    </div>
                                    <div className="font-semibold text-base md:text-lg flex flex-nowrap items-center gap-2">
                                        Total:<span className="text-green-500">₹{order.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Order;
