import express from "express";
import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/logout", logoutUser);

// NEW: Auth-check route
router.get('/me', userMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
