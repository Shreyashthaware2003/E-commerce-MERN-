import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/util";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setCartCount(0);
                return;
            }

            const res = await axios.get(`${BACKEND_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            const count = res.data?.cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
            setCartCount(count);
        } catch (err) {
            console.error("Error fetching cart count:", err);
            setCartCount(0);
        }
    };

    const clearCart = async () => {
        try {
            const token = localStorage.getItem("token");

            if (token) {
                // Call backend to clear the cart
                await axios.delete(`${BACKEND_URL}/cart/clear`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
            }

            // Reset cart count on client side
            setCartCount(0);

            // Optionally clear localStorage cart data
            localStorage.removeItem("cart");
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };

    useEffect(() => {
        fetchCartCount(); // Fetch the cart count initially
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
