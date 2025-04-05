import express from "express"
import { loginAdmin, registerAdmin } from "../controller/admin.controller.js"

const router = express.Router()

router.post("/signup", registerAdmin)
router.post("/login", loginAdmin)

export default router