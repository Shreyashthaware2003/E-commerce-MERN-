import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/util';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useCart } from '../cart/CartContext';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const { fetchCartCount } = useCart(); // ✅ destructure fetchCartCount from context

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/product/${id}`);
                console.log("Fetched Product:", res.data);

                if (res.data.product) {
                    setProduct(res.data.product);
                } else {
                    setProduct(res.data);
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!selectedSize) {
            toast.error("Please select a size.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const res = await axios.post(`${BACKEND_URL}/cart/add`, {
                productId: product._id,
                size: selectedSize,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data.message);
            toast.success("Added to cart!");
            fetchCartCount(); // ✅ Update cart count immediately
        } catch (err) {
            console.error("Error adding to cart:", err.response?.data || err.message);
            toast.error("Failed to add to cart");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] w-full">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center mt-10 text-gray-600">
                Product not found.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-[86px] flex flex-col absolute left-0 right-0" style={{ fontFamily: "Poppins" }}>
            <div className='px-4 py-10 flex flex-col md:flex-row gap-10 border-t border-gray-300'>

                {/* Product Image */}
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <div className='w-20 md:w-28 order-2 md:order-1'>
                        <img src={product.image} alt="" />
                    </div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover order-1 md:order-2"
                    />
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 md:py-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {product.category} / {product.subCategory}
                        </p>
                    </div>

                    <p className="text-gray-700 text-base">{product.description}</p>

                    <div className="text-xl font-bold text-black">${product.price}</div>

                    {/* Size Selection */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Select Size:</h3>
                        <div className="flex flex-wrap gap-3">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border text-sm ${selectedSize === size
                                        ? 'bg-black text-white'
                                        : 'border-gray-400 text-gray-600 bg-gray-200 hover:border-black cursor-pointer'
                                        } transition`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex items-center justify-center gap-2 w-fit px-6 py-3 bg-black text-white transition cursor-pointer"
                    >
                        <FiShoppingCart className="text-xl" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
