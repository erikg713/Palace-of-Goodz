import { Router } from "express";
import { verifyPayment } from "../controllers/paymentController";

const router = Router();
router.post("/verify", verifyPayment);

export default router;
