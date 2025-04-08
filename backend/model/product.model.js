import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Kids', 'Unisex'], // adjust based on your needs
    },
    subCategory: {
        type: String,
        required: true,
        enum: ['Topwear', 'Bottomwear', 'Footwear', 'Accessories'], // adjust accordingly
    },
    price: {
        type: Number,
        required: true,
    },
    sizes: {
        type: [String],
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        default: [],
    },
    image: {
        type: String,
        required: true, // URL or cloudinary path
    },
    bestseller: {
        type: Boolean,
        default: false,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            name: { type: String, required: true },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],

}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);

