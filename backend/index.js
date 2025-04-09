import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';
import orderRoute from './routes/order.route.js';

dotenv.config();

const app = express();

// 🌐 CORS setup - allow frontend access (local + production)
const allowedOrigins = [
    "http://localhost:5173",                      // local dev
    "https://e-commerce-mern-mu-nine.vercel.app"  // ✅ REMOVE trailing slash here
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// 📸 Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🔧 Middlewares
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
    res.send("✅ Backend is up and running!");
});

// 🛣️ Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/order', orderRoute);

// ⚙️ MongoDB Connection
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
    });
