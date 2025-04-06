import express from 'express';
import { addToCart, emptyCart, getCart, removeItem, updateCartItem } from '../controller/cart.controller.js';
import { userMiddleware } from '../middleware/user.middleware.js'; // Assumes auth middleware is ready

const router = express.Router();

router.post('/add', userMiddleware, addToCart);
router.get('/', userMiddleware, getCart);
router.put('/update/:itemId', userMiddleware, updateCartItem);
router.delete('/clear', userMiddleware, emptyCart)
router.delete('/remove/:itemId', userMiddleware, removeItem);

export default router;
