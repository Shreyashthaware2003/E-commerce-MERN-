import mongoose from "mongoose";
import { Order } from "../model/order.model.js";
import { Cart } from "../model/cart.model.js"; // Add this import to interact with the cart model

// Controller to place an order
export const placeOrder = async (req, res) => {
    try {
        // Destructure form data from request body
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

        // Basic validation to ensure required fields are present
        if (
            !firstName ||
            !lastName ||
            !email ||
            !street ||
            !city ||
            !state ||
            !zipcode ||
            !country ||
            !phone ||
            !paymentMethod ||
            !totalPrice
        ) {
            return res.status(400).json({
                message: "Please fill all required fields.",
            });
        }

        // Create a new order using the form data
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
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Empty the user's cart after the order is placed
        const userId = req.user?._id;  // Assuming you have a way to get the user ID from the request (e.g., authentication middleware)
        
        if (!userId) {
            return res.status(401).json({
                message: 'User not authorized.',
            });
        }

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } }, // Clear the cart
            { new: true } // Return the updated cart
        );

        // Return success response
        res.status(201).json({
            message: 'Order placed successfully!',
            order: savedOrder,
            cart: cart,  // You can return the updated cart if necessary
        });
    } catch (error) {
        // Return error response in case of any issue
        console.error('Error placing order:', error);
        res.status(500).json({
            message: 'Failed to place the order. Please try again.',
            error: error.message,
        });
    }
};

// Controller to fetch all orders
export const getAllOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Return success response with orders
        res.status(200).json({
            message: 'Orders fetched successfully!',
            orders: orders,
        });
    } catch (error) {
        // Return error response in case of any issue
        console.error('Error fetching orders:', error);
        res.status(500).json({
            message: 'Failed to fetch orders. Please try again.',
            error: error.message,
        });
    }
};
