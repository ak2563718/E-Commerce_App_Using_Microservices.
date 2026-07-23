import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../src/db.js';
import axios from 'axios';

// 1 . create cart 
export const createCart = asyncHandler(async(req, res, next)=>{
    const { userId } = req.body;
    if(!userId){
        return next(new AppError("UserID is required", 400))
    }
    const existingCart = await prisma.cart.findUnique({
        where:{
            userId
        }
    })
    if(existingCart){
        return next(new AppError("Cart already exists", 400))
    }
    const cart = await prisma.cart.create({
        data:{
            userId,
            subtotal:0,
            discount:0,
            tax:0,
            total:0,
        },
        include:{
            items:true,
        }
    })
    res.status(201).json({
        message:"Cart Created successfully",
        success:true,
        data:cart
    })
})

// 2. Get Cart
export const getCart = asyncHandler(async(req, res, next)=>{
    const userId = req.params.userId;
    const cart = await prisma.cart.findUnique({
        where:{
            userId
        },
        include:{
            items:true,
        }
    });
    if(!cart){
       return next(new AppError("Cart not found", 404))
    }
    res.status(200).json({
        message:"Cart found",
        success:true,
        data:cart
    })
})

// 1. create Cart items
export const createCartItems = asyncHandler(async (req, res, next) => {
    const { cartId } = req.params;
    const { productId, variantId, quantity } = req.body;

    // Validate input
    if (!productId) {
        return next(new AppError("Product id is required", 400));
    }

    if (!variantId) {
        return next(new AppError("Variant id is required", 400));
    }

    const qty = Number(quantity);

    if (!qty || qty <= 0) {
        return next(new AppError("Quantity must be greater than 0", 400));
    }

    // Check cart exists
    const cart = await prisma.cart.findUnique({
        where: {
            id: cartId,
        },
    });

    if (!cart) {
        return next(new AppError("Cart does not exist", 404));
    }

    // Fetch product from Product Service
    const response = await axios.get(
        `http://localhost:6002/api/products/${productId}`
    );

    const product = response.data.data;

    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    // Find selected variant
    const variant = product.variants.find(
        (v) => v.id === variantId
    );

    if (!variant) {
        return next(new AppError("Variant not found", 404));
    }

    // Check if item already exists
    const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId,
            productId,
            variantId,
        },
    });

    if (existingItem) {
        const updatedQuantity = existingItem.quantity + qty;
        const updatedTotalPrice = existingItem.unitPrice * updatedQuantity;

        const updatedItem = await prisma.cartItem.update({
            where: {
                id: existingItem.id,
            },
            data: {
                quantity: updatedQuantity,
                totalPrice: updatedTotalPrice,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Cart item updated",
            data: updatedItem,
        });
    }

    // Create new cart item
    const unitPrice = Number(variant.price);
    const totalPrice = unitPrice * qty;

    const cartItem = await prisma.cartItem.create({
        data: {
            cartId,
            productId,
            variantId,
            quantity: qty,
            productName: product.name,
            productSlug: product.slug,
            unitPrice,
            totalPrice,
        },
    });

    return res.status(201).json({
        success: true,
        message: "Cart item created",
        data: cartItem,
    });
});

// 2. update cart items
export const updateCartItems = asyncHandler(async(req, res, next)=>{
    const { itemId } = req.params;
    const { quantity } = req.body;
    if(!quantity || quantity <=0){
        return next(new AppError("quantity can not be negative or zero", 400))
    }
    const cartItem = await prisma.cartItem.findUnique({
        where:{id:itemId}
    })
    if(!cartItem){
        return next(new AppError("CartItem not found", 404))
    }
    const totalPrice = cartItem.unitPrice * quantity;
    const updateditem = await prisma.cartItem.update({
        where:{id:itemId},
        data:{
            quantity,
            totalPrice,
        }
    })
    res.status(200).json({
        message:"Cart items updated",
        success:true,
        data:updateditem
    })
})


// 3. delete cart items 
export const deleteCartItems = asyncHandler(async(req, res, next)=>{
    const { itemId } = req.params;
    const cartItem = await prisma.cartItem.findUnique({where:{id:itemId}})
    if(!cartItem){
        return next(new AppError("Cart not found", 404))
    }
    await prisma.cartItem.delete({where:{id:itemId}})
    res.status(200).json({
        message:"items Deleted Successfully",
        success:true,
    })
});


// 4. Clear cart
export const clearCart = asyncHandler(async(req, res, next)=>{
    const { cartId } = req.params;
    const cartItems = await prisma.cartItem.deleteMany({where:{cartId}})
    res.status(200).json({
        message:"cart cleared",
        success:true,
    })
})