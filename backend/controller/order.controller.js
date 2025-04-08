import mongoose from "mongoose";
import { Order } from "../model/order.model.js";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";

// Controller to place an order
export const placeOrder = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode,
            country,
            phone,
            paymentMethod,
            totalPrice,
        } = req.body;

        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authorized.' });
        }

        // Fetch cart with populated product info
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty." });
        }

        // Build order items from populated cart
        const orderItems = cart.items.map((item) => ({
            product: item.product,
            name: item.product.name,
            image: item.product.image, // Cloudinary URL
            price: item.product.price,
            size: item.size,
            quantity: item.quantity,
        }));

        const newOrder = new Order({
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode,
            country,
            phone,
            paymentMethod,
            totalPrice,
            user: userId,
            items: orderItems, // 👈 include full product data
        });

        const savedOrder = await newOrder.save();

        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } },
            { new: true }
        );

        res.status(201).json({
            message: 'Order placed successfully!',
            order: savedOrder,
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({
            message: 'Failed to place the order. Please try again.',
            error: error.message,
        });
    }
};

// Controller to fetch all orders for a particular user
export const getAllOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await Order.find({ user: userId }).populate("user", "firstName email");

        res.status(200).json({
            message: "Orders fetched successfully!",
            orders,
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({
            message: "Failed to fetch orders. Please try again.",
            error: error.message,
        });
    }
};
