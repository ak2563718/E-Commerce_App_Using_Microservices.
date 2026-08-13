import express from "express";

import {
  createPayment,
  getPaymentById,
  getPaymentByOrderId,
  getUserPayments,
  updatePaymentStatus,
  createRefund,
  getPaymentRefunds,
  updateRefundStatus,
} from "../controllers/payment.controller.js";

const router = express.Router();


// Payments
router.post("/", createPayment);

router.get("/order/:orderId", getPaymentByOrderId);

router.get("/user/:userId", getUserPayments);

router.get("/:id", getPaymentById);

router.patch("/:id/status", updatePaymentStatus);


// Refunds
router.post("/:paymentId/refund", createRefund);

router.get("/:paymentId/refunds", getPaymentRefunds);

router.patch("/refund/:refundId/status", updateRefundStatus);

export default router;