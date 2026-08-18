import express from 'express';
import { clearCart, createCart, createCartItems, deleteCartItems, getCart, updateCartItems } from '../controller/cart.Controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
// 1. cart routes
router.post("/carts",createCart)
router.get("/carts",authMiddleware,getCart)

// 2. cart items routes
router.post("/carts/:cartId/cartitems",authMiddleware,createCartItems)
router.patch("/cartitems/:itemId",authMiddleware,updateCartItems)
router.delete("/cartitems/:itemsId",authMiddleware,deleteCartItems)
router.delete("/carts/:cartId",authMiddleware,clearCart)
export default router;