import express from 'express'
import { getAllOrders, placeOrder, getAllOrdersForAdmin, deleteOrder } from '../controller/order.controller.js'
import { userMiddleware } from '../middleware/user.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = express.Router()

router.post("/place-order", userMiddleware, placeOrder);
router.get("/get", userMiddleware, getAllOrders)
router.get('/all', adminMiddleware, getAllOrdersForAdmin);
router.delete('/:id', adminMiddleware, deleteOrder);

export default router