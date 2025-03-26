import { Router } from "express";
import { addItemToCart, getCart, removeItemFromCart, clearCart } from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/add", authMiddleware, addItemToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:itemId", authMiddleware, removeItemFromCart);
router.delete("/clear", authMiddleware, clearCart);

export default router;
