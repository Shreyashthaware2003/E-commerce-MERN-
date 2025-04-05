import { Product } from "../model/product.model.js";
import { v2 as cloudinary } from "cloudinary";

// create product
export const createProduct = async (req, res) => {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const imageFile = req.files.image;

        const allowedTypes = ["image/webp", "image/png", "image/jpeg"];
        if (!allowedTypes.includes(imageFile.mimetype)) {
            return res.status(400).json({ message: "Invalid image format. Only JPEG/PNG or WEBP allowed." });
        }
        console.log("Request body image: ", req.body.image);

        const cloudinaryRes = await cloudinary.uploader.upload(imageFile.tempFilePath);

        const product = new Product({
            name,
            description,
            price,
            category,
            subCategory,
            sizes: Array.isArray(sizes) ? sizes : [sizes], // ensure it's an array
            bestseller: bestseller === 'true' || bestseller === true, // handle checkbox or boolean
            image: cloudinaryRes.secure_url,
        });

        const savedProduct = await product.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });

    } catch (error) {
        console.error("Product creation error:", error);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};


// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

//   get product by id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
};

//Update a product (Admin Only)
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        if (req.files && req.files.image) {
            const uploadedImage = await cloudinary.uploader.upload(req.files.image.tempFilePath);
            product.image = uploadedImage.secure_url;
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.subCategory = subCategory || product.subCategory;
        product.sizes = sizes ? (Array.isArray(sizes) ? sizes : [sizes]) : product.sizes;
        product.bestseller = typeof bestseller !== 'undefined' ? (bestseller === 'true' || bestseller === true) : product.bestseller;

        const updatedProduct = await product.save();
        res.status(200).json({ message: "Product updated", product: updatedProduct });

    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};


// Delete a product (Admin Only)
export const deleteProduct = async (req, res) => {
    try {
        console.log("Deleting product ID:", req.params.id); // 👈 log ID

        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (!deleted) {
            console.log("No product found to delete");
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Product deleted successfully");
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.error("Delete error:", error); // 👈 show error
        res.status(500).json({ message: "Server error" });
    }
};

