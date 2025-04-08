import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import the toast method
import axios from 'axios'; // Import axios for making requests
import { BACKEND_URL } from '../../utils/util';
import { useCart } from '../cart/CartContext'; // Import useCart

function PlaceOrder() {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [totalPrice, setTotalPrice] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart(); // Destructure clearCart from useCart

    useEffect(() => {
        // Retrieve the total price from the URL query string
        const params = new URLSearchParams(location.search);
        const price = params.get('total');
        if (price) {
            setTotalPrice(price); // Set the price in the state
        }
    }, [location]);

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Validate if all required fields are filled
    const isFormValid = Object.values(formData).every((field) => field) && selectedPayment;

    // Handle form submission (check if form is valid before proceeding)
    const handlePlaceOrder = async () => {

        if (!isFormValid) {
            toast.error('Please fill in all the required information before placing the order.');
            return;
        }

        try {
            // Prepare the data to send to the backend
            const orderData = {
                ...formData,
                paymentMethod: selectedPayment,
                totalPrice,
            };

            // Get the token from localStorage or sessionStorage
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('You are not authenticated. Please log in.');
                return;
            }

            // Send POST request to the backend to place the order
            const response = await axios.post(
                `${BACKEND_URL}/order/place-order`,
                orderData, // Replace with your order data
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Handle success response
            if (response.status === 201) {
                toast.success('Order placed successfully!');
                clearCart();  // Clear the cart after a successful order
                setFormData({ // Reset the form data
                    firstName: '',
                    lastName: '',
                    email: '',
                    street: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    country: '',
                    phone: '',
                });
                navigate('/orders');
            } else {
                toast.error('Failed to place the order.');
            }

            console.log('Order placed successfully:', response.data);
        } catch (error) {
            // Handle errors during the request
            console.error('Error placing order:', error);
            toast.error('Failed to place the order. Please try again.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-[90px] md:px-4" style={{ fontFamily: "Poppins" }}>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                {/* Delivery Information Section */}
                <div className="md:w-1/2 bg-white p-6">
                    <div className="text-lg md:text-2xl font-medium mb-4 uppercase flex flex-nowrap items-center gap-2">
                        <span className='text-gray-500'>Delivery </span>
                        <span className='text-gray-700'>Information</span>
                        <hr className='border-2 w-8 md:w-12' />
                    </div>
                    <form className="space-y-4">
                        {/* Form fields for user data */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Form Fields */}
                        <input
                            type="text"
                            id="street"
                            name="street"
                            placeholder="Street Address"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    placeholder="Zip Code"
                                    value={formData.zipcode}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Payment Options Section */}
                <div className="md:w-1/2 bg-white p-6">
                    <div className="text-lg md:text-2xl font-medium mb-4 uppercase flex flex-nowrap items-center gap-2">
                        <span className='text-gray-500'>Payment </span>
                        <span className='text-gray-700'>options</span>
                        <hr className='border-2 w-8 md:w-12' />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <input
                                type="radio"
                                id="stripe"
                                name="paymentMethod"
                                value="stripe"
                                checked={selectedPayment === 'stripe'}
                                onChange={handlePaymentChange}
                                className="mr-2"
                            />
                            <label htmlFor="stripe" className="text-gray-700">Pay with Stripe</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="razorpay"
                                name="paymentMethod"
                                value="razorpay"
                                checked={selectedPayment === 'razorpay'}
                                onChange={handlePaymentChange}
                                className="mr-2"
                            />
                            <label htmlFor="razorpay" className="text-gray-700">Pay with Razorpay</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="cod"
                                checked={selectedPayment === 'cod'}
                                onChange={handlePaymentChange}
                                className="mr-2"
                            />
                            <label htmlFor="cod" className="text-gray-700">Cash on Delivery</label>
                        </div>

                        <button
                            className="w-full p-2 bg-blue-600 text-white rounded mt-6"
                            onClick={handlePlaceOrder}
                            disabled={!isFormValid}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
