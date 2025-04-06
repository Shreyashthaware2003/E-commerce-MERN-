import express from 'express'
import { getAllOrders, placeOrder } from '../controller/order.controller.js'
import { userMiddleware } from '../middleware/user.middleware.js';

const router = express.Router()

router.post("/place-order", userMiddleware, placeOrder);
router.post("/get", getAllOrders)

export default router