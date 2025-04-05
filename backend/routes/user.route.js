import express from "express";
import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
const router = express.Router();


router.post('/signup', registerUser);
router.post('/login', loginUser)
router.post("/logout", logoutUser)


export default router;