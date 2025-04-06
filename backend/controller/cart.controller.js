import { Cart } from '../model/cart.model.js'; // Adjust path as needed

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id; // You need auth middleware to attach user
        const { productId, size } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && item.size === size
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += 1;
        } else {
            cart.items.push({ product: productId, size, quantity: 1 });
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });

    } catch (err) {
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
};

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.status(200).json({ cart });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving cart", error: err.message });
    }
};

// Update quantity of a cart item
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.id(itemId);
        if (!item) return res.status(404).json({ message: "Item not found in cart" });

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Quantity updated", cart });
    } catch (err) {
        res.status(500).json({ message: "Error updating quantity", error: err.message });
    }
};


// Remove an item
export const removeItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        await cart.save();
        res.status(200).json({ message: "Item removed", cart });

    } catch (err) {
        res.status(500).json({ message: "Error removing item", error: err.message });
    }
};


// Empty the cart after order is placed
export const emptyCart = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from the authenticated user
        console.log('User ID:', userId); // Log user ID for debugging

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            console.log('Cart not found for user:', userId); // Log if cart not found
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = []; // Clear the cart items
        await cart.save();

        res.status(200).json({ message: "Cart emptied successfully", cart });
    } catch (err) {
        console.error('Error emptying cart:', err); // Log the full error
        res.status(500).json({ message: "Error emptying cart", error: err.message });
    }
};

