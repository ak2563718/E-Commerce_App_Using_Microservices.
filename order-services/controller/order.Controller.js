import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../src/db.js'

// ============================================================
// CREATE ORDER
// ============================================================

export const createOrder = asyncHandler(async (req, res) => {
  const {
    userId,
    addressId,
    paymentMethod,
    subtotal,
    discountAmount = 0,
    taxAmount = 0,
    shippingAmount = 0,
    totalAmount,
    currency = "INR",
    couponCode,
    shippingAddress,
    items,
    notes,
  } = req.body;

  if (
    !userId ||
    !paymentMethod ||
    !subtotal ||
    !totalAmount ||
    !items ||
    !items.length
  ) {
    return next(new AppError('userId, paymentMethod, subtotal, totalAmount and items are required',400))
  }

  // ----------------------------------------------------------
  // Validate amounts
  // ----------------------------------------------------------

  if (
    Number(subtotal) < 0 ||
    Number(discountAmount) < 0 ||
    Number(taxAmount) < 0 ||
    Number(shippingAmount) < 0 ||
    Number(totalAmount) <= 0
  ) {
    return next(new AppError('Invalid order amount',400))
  }

  // ----------------------------------------------------------
  // Generate unique order number
  // ----------------------------------------------------------

  const orderNumber = `ORD-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;

  // ----------------------------------------------------------
  // Create order + address + items + status history
  // ----------------------------------------------------------

  const order = await prisma.$transaction(async (tx) => {
    // Create order
    const newOrder = await tx.order.create({
      data: {
        userId,
        orderNumber,
        paymentMethod,

        subtotal,
        discountAmount,
        taxAmount,
        shippingAmount,
        totalAmount,

        currency,
        couponCode,
        shippingAddressId:addressId,
        notes,

        // Create order items
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            productSlug: item.productSlug,
            sku: item.sku,
            image: item.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            discountPrice: item.discountPrice,
            totalPrice: item.totalPrice,
          })),
        },

        // Initial status history
        statusHistory: {
          create: {
            status: "PENDING",
            changedBy: userId,
            remarks: "Order created",
          },
        },
      },

      include: {
        items: true,
        shippingAddress: true,
        statusHistory: true,
      },
    });

    return newOrder;
  });

  res.status(201).json({
    message:"Order placed",
    data:order,
  })
})

// ============================================================
// GET ORDER BY ID
// ============================================================

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
      shippingAddress: true,
      statusHistory: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!order) {
    return next(new AppError("Order not found",404));
  }

  return res.status(200).json({
    message:'order fetched successfully',
    data:order,
    success:true,
  }
  );
});


// ============================================================
// GET ORDER BY ORDER NUMBER
// ============================================================

export const getOrderByNumber = asyncHandler(async (req, res) => {
  const { orderNumber } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      orderNumber,
    },
    include: {
      items: true,
      shippingAddress: true,
      statusHistory: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!order) {
    return next(new AppError( "Order not found",404));
  }

  return res.status(200).json({
    message:"Order fetched successfully",
    data:order,
    success:true,
  }
  );
});


// ============================================================
// GET USER ORDERS
// ============================================================

export const getUserOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },

    include: {
      items: true,
      shippingAddress: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json({
      data:orders,
      message:"User orders fetched successfully",
      success:true,
});
});


// ============================================================
// GET ALL ORDERS
// ============================================================

export const getAllOrders = asyncHandler(async (req, res) => {
  const {
    status,
    paymentStatus,
    page = 1,
    limit = 10,
  } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  const where = {};

  if (status) {
    where.status = status;
  }

  if (paymentStatus) {
    where.paymentStatus = paymentStatus;
  }

  const [orders, totalOrders] = await prisma.$transaction([
    prisma.order.findMany({
      where,

      include: {
        items: true,
        shippingAddress: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limitNumber,
    }),

    prisma.order.count({
      where,
    }),
  ]);

  return res.status(200).json({
        orders,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          totalOrders,
          totalPages: Math.ceil(totalOrders / limitNumber),
        },
        message:"Orders fetched successfully",
})
});


// ============================================================
// UPDATE ORDER STATUS
// ============================================================

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    status,
    changedBy,
    remarks,
  } = req.body;

  if (!status) {
    return next(new AppError("Order status is required",400));
  }

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    return next( new AppError("Order not found",404));
  }

  // Don't update if status is already the same
  if (order.status === status) {
    return next(new AppError(
      `Order is already ${status}`,404
    ));
  }

  const updatedOrder = await prisma.$transaction(async (tx) => {
    // Update order status
    const updated = await tx.order.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });

    // Add status history
    await tx.orderStatusHistory.create({
      data: {
        orderId: id,
        status,
        changedBy,
        remarks,
      },
    });

    return updated;
  });

  return res.status(200).json({
      data:updatedOrder,
      success:true,
      message:"Order status updated successfully"
});
});


// ============================================================
// UPDATE PAYMENT STATUS
// ============================================================

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    paymentStatus,
    paymentTransactionId,
  } = req.body;

  if (!paymentStatus) {
    return next(new AppError(
      "Payment status is required",400
    ));
  }

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    return next(new AppError( "Order not found",404));
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id,
    },

    data: {
      paymentStatus,
      paymentTransactionId,
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedOrder,
      "Payment status updated successfully"
    )
  );
});


// ============================================================
// UPDATE SHIPPING DETAILS
// ============================================================

export const updateShippingDetails = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const {
      trackingNumber,
      carrier,
    } = req.body;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },

      data: {
        trackingNumber,
        carrier,
      },
    });

    return res.status(200).json({
        updatedOrder,
        success:true,
        message:"Shipping details updated successfully"
    });
  }
);


// ============================================================
// UPDATE SHIPPING ADDRESS
// ============================================================

export const updateShippingAddress = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
      landmark,
    } = req.body;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return next(new AppError("Order not found",404));
    }

    if (!order.shippingAddressId) {
      return next(new AppError(
        "Shipping address not found",404
      ));
    }

    const address = await prisma.shippingAddress.update({
      where: {
        id: order.shippingAddressId,
      },

      data: {
        fullName,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        postalCode,
        landmark,
      },
    });

    return res.status(200).json({
        data:address,
        message:"Shipping address updated successfully"
      
  });
  }
);


// ============================================================
// CANCEL ORDER
// ============================================================

export const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { changedBy, remarks } = req.body;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  // Orders that cannot be cancelled
  const nonCancellableStatuses = [
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
    "REFUNDED",
  ];

  if (nonCancellableStatuses.includes(order.status)) {
    return next(new AppError(
      `Order cannot be cancelled when status is ${order.status}`,404
    ));
  }

  const cancelledOrder = await prisma.$transaction(
    async (tx) => {
      const updatedOrder = await tx.order.update({
        where: {
          id,
        },

        data: {
          status: "CANCELLED",
        },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId: id,
          status: "CANCELLED",
          changedBy,
          remarks: remarks || "Order cancelled",
        },
      });

      return updatedOrder;
    }
  );

  return res.status(200).json({
      success:true,
      data:cancelledOrder,
      message:"Order cancelled successfully"
});
});


// ============================================================
// GET ORDER STATUS HISTORY
// ============================================================

export const getOrderStatusHistory = asyncHandler(
  async (req, res) => {
    const { orderId } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return next(new AppError("Order not found",404));
    }

    const history = await prisma.orderStatusHistory.findMany({
      where: {
        orderId,
      },

      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
        data:history,
        message:"Order status history fetched successfully"
  });
  }
);