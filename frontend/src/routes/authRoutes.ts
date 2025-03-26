import { Router } from "express";
import { loginUser, registerUser, getUserProfile } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", authMiddleware, getUserProfile);

export default router;
