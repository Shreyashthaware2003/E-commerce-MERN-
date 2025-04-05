import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../model/admin.model.js";

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for existing admin
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT
        const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            message: "Admin registered successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Admin registration failed", error: error.message });
    }
};


// Admin Login
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password.toString(), admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.status(200).json({
            message: "Admin logged in successfully",
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: "admin",
            token,
        })

    } catch (error) {
        console.error("Admin login error:", error.message);
        res.status(500).json({ message: "Admin login failed", error: error.message });
    }
}