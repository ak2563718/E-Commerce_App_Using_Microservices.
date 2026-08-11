import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../src/db.js'

export const createOrder = asyncHandler(async(req, res, next)=>{
    const { addressId ,product,variantId, quantity } = req.body;
    const productId = req.params.id;
    const userId = req.user.id;
    const item = await prisma.orderItem.create({
        data:{
            productId,
            variantId,
            productName:product.productName,
            productSlug:product.slug,
            sku:product.sku,
            image:product.images[0].url,
            quantity:quantity,
            unitPrice:product.variants[0].price,
            totalPrice:Number(quantity * product.variants[0].price),
        }
    }) 
});

export const createAddress = asyncHandler(async(req, res, next)=>{
    const userId = req.user.id;
    const address = req.body;
    if(!address){
        return  next(new AppError('Address is required', 400))
    }
    const area = await prisma.address.create({
        data:{
            userId,
            fullName:address.fullName,
            phone:address.phone,
            addressLine1:address.addressLine1,
            addressLine2:address.addressLine2 || " ",
            city:address.city,
            state:address.state,
            country:address.country,
            postalCode:address.postalCode,
            landmark:address.landmark || " ",
        }
    })
    res.status(201).json({
        message:"Address added successfully",
        success:false,
        data:area,
    })
})