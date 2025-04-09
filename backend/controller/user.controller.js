import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { User } from "../model/user.model.js";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // valid for 7 days
    });
};

// Create Account
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // 🔐 Hash password manually before creating the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword })

        res.status(201).json({
            message: "Account created successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// Login account
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

// logout user
export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};