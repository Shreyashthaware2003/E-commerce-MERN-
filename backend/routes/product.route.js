import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, addReview } from '../controller/product.controller.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import { userMiddleware } from '../middleware/user.middleware.js';

const router = express.Router();


router.post("/create", adminMiddleware, createProduct)
router.get("/get", getAllProducts)
router.get("/:id", getProductById)
router.put("/update/:id", adminMiddleware, updateProduct)
router.post('/:id/review', userMiddleware, addReview);
router.delete("/delete/:id", deleteProduct)

export default router;