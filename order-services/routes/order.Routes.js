import express from "express";

import {
  createOrder,
  getOrderById,
  getOrderByNumber,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  updateShippingDetails,
  updateShippingAddress,
  cancelOrder,
  getOrderStatusHistory,
} from "../controller/order.Controller.js";
import { authMiddleware } from "../middleware/auth.Middleware.js";

const router = express.Router();


// =============================
// Orders
// =============================

router.post("/order", authMiddleware,createOrder);

router.get("/order/getorder", authMiddleware ,getAllOrders);

router.get("/user/order",authMiddleware, getUserOrders);

router.get("/number/:orderNumber", getOrderByNumber);

router.get("/order/:id", getOrderById);


// =============================
// Order Status
// =============================

router.patch("/:id/status", updateOrderStatus);

router.patch("/:id/cancel", cancelOrder);


// =============================
// Payment
// =============================

router.patch("/:id/payment-status", updatePaymentStatus);


// =============================
// Shipping
// =============================

router.patch("/:id/shipping", updateShippingDetails);

router.patch("/:id/address", updateShippingAddress);


// =============================
// Status History
// =============================

router.get("/:orderId/status-history", getOrderStatusHistory);


export default router;