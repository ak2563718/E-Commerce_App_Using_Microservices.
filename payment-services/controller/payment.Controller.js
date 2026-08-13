import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


// =====================================================
// CREATE PAYMENT
// =====================================================

export const createPayment = asyncHandler(async (req, res) => {
  const {
    orderId,
    userId,
    amount,
    currency,
    paymentMethod,
    paymentGatewayId,
    gatewayResponse,
  } = req.body;

  if (!orderId || !userId || !amount || !paymentMethod) {
    throw new ApiError(
      400,
      "orderId, userId, amount and paymentMethod are required"
    );
  }

  if (Number(amount) <= 0) {
    throw new ApiError(400, "Amount must be greater than 0");
  }

  // One payment per order
  const existingPayment = await prisma.payment.findUnique({
    where: {
      orderId,
    },
  });

  if (existingPayment) {
    throw new ApiError(
      409,
      "Payment already exists for this order"
    );
  }

  const payment = await prisma.payment.create({
    data: {
      orderId,
      userId,
      amount,
      currency,
      paymentMethod,
      paymentGatewayId,
      gatewayResponse,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      payment,
      "Payment created successfully"
    )
  );
});


// =====================================================
// GET PAYMENT BY ID
// =====================================================

export const getPaymentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const payment = await prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      refunds: true,
    },
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      payment,
      "Payment fetched successfully"
    )
  );
});


// =====================================================
// GET PAYMENT BY ORDER ID
// =====================================================

export const getPaymentByOrderId = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const payment = await prisma.payment.findUnique({
    where: {
      orderId,
    },
    include: {
      refunds: true,
    },
  });

  if (!payment) {
    throw new ApiError(
      404,
      "Payment not found for this order"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      payment,
      "Payment fetched successfully"
    )
  );
});


// =====================================================
// GET USER PAYMENTS
// =====================================================

export const getUserPayments = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const payments = await prisma.payment.findMany({
    where: {
      userId,
    },
    include: {
      refunds: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      payments,
      "User payments fetched successfully"
    )
  );
});


// =====================================================
// UPDATE PAYMENT STATUS
// =====================================================

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    paymentStatus,
    transactionId,
    paymentGatewayId,
    gatewayResponse,
  } = req.body;

  if (!paymentStatus) {
    throw new ApiError(400, "Payment status is required");
  }

  const payment = await prisma.payment.findUnique({
    where: {
      id,
    },
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  const updatedPayment = await prisma.payment.update({
    where: {
      id,
    },
    data: {
      paymentStatus,
      transactionId,
      paymentGatewayId,
      gatewayResponse,

      ...(paymentStatus === "SUCCESS" && {
        paidAt: new Date(),
      }),
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedPayment,
      "Payment status updated successfully"
    )
  );
});


// =====================================================
// CREATE REFUND
// =====================================================

export const createRefund = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const {
    amount,
    reason,
    refundGatewayId,
  } = req.body;

  if (!amount) {
    throw new ApiError(400, "Refund amount is required");
  }

  if (Number(amount) <= 0) {
    throw new ApiError(
      400,
      "Refund amount must be greater than 0"
    );
  }

  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      refunds: true,
    },
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (payment.paymentStatus !== "SUCCESS") {
    throw new ApiError(
      400,
      "Only successful payments can be refunded"
    );
  }

  // Calculate already refunded amount
  const refundedAmount = payment.refunds.reduce(
    (total, refund) => {
      if (
        refund.refundStatus === "SUCCESS" ||
        refund.refundStatus === "PENDING"
      ) {
        return total + Number(refund.amount);
      }

      return total;
    },
    0
  );

  const requestedRefund = Number(amount);
  const paymentAmount = Number(payment.amount);

  if (refundedAmount + requestedRefund > paymentAmount) {
    throw new ApiError(
      400,
      "Refund amount exceeds remaining payment amount"
    );
  }

  const refund = await prisma.refund.create({
    data: {
      paymentId,
      amount,
      reason,
      refundGatewayId,
    },
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      refund,
      "Refund created successfully"
    )
  );
});


// =====================================================
// GET PAYMENT REFUNDS
// =====================================================

export const getPaymentRefunds = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  const refunds = await prisma.refund.findMany({
    where: {
      paymentId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      refunds,
      "Refunds fetched successfully"
    )
  );
});


// =====================================================
// UPDATE REFUND STATUS
// =====================================================

export const updateRefundStatus = asyncHandler(async (req, res) => {
  const { refundId } = req.params;

  const {
    refundStatus,
    refundGatewayId,
  } = req.body;

  if (!refundStatus) {
    throw new ApiError(400, "Refund status is required");
  }

  const refund = await prisma.refund.findUnique({
    where: {
      id: refundId,
    },
  });

  if (!refund) {
    throw new ApiError(404, "Refund not found");
  }

  const updatedRefund = await prisma.refund.update({
    where: {
      id: refundId,
    },
    data: {
      refundStatus,
      refundGatewayId,

      ...(refundStatus === "SUCCESS" && {
        refundedAt: new Date(),
      }),
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedRefund,
      "Refund status updated successfully"
    )
  );
}); 