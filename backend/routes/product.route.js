import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controller/product.controller.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = express.Router();


router.post("/create", adminMiddleware, createProduct)
router.get("/get", getAllProducts)
router.get("/:id", getProductById)
router.put("/update/:id", adminMiddleware, updateProduct)
router.delete("/delete", deleteProduct)

export default router;