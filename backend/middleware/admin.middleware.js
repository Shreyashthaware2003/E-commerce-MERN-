import jwt from "jsonwebtoken";
import { Admin } from "../model/admin.model.js";

export const adminMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id).select("-password");

        if (!admin) {
            return res.status(403).json({ message: "Not authorized as admin" });
        }

        // Optional: if you store role on Admin model
        // if (admin.role !== "admin") {
        //   return res.status(403).json({ message: "Access denied: Admins only" });
        // }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};
