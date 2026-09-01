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

const router = express.Router();


// =============================
// Orders
// =============================

router.post("/order", createOrder);

router.get("/", getAllOrders);

router.get("/user/:userId", getUserOrders);

router.get("/number/:orderNumber", getOrderByNumber);

router.get("/:id", getOrderById);


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