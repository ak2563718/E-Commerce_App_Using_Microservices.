import { prisma } from "../src/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";


// 1. Create a variant 
export const createVariant = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const {sku, price, stock} = req.body;
    const found = await prisma.productVariant.findUnique({where:{sku}})
    if(found){
        return next(new AppError("SKU already registered", 400))
    }
    const total = Number(stock)
    const variant = await prisma.productVariant.create({
        data:{
            productId:id,
            sku,
            price,
            stock:total,
        }
    })
    res.status(201).json({
        message:"New variant created",
        success:true,
        data:variant,
    })
})

// 2. Get Variant Details
export const getVariants = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const variant = await prisma.productVariant.findMany({
        where:{
            productId:id
        },
        include:{
            images:true,
            product:true,
        }
    })
    if(!variant){
        return next(new AppError("Variant not found", 404))
    }
    res.status(200).json({
        message:"Variants found",
        success:true,
        data:variant
    })
})

// 3. Delete Variant 
export const deleteVariant = asyncHandler(async(req, res, next)=>{
    const id = req.params.variantId;
    const variant = await prisma.productVariant.findUnique({
        where:{
            id
        }
    })
    if(!variant){
        return next(new AppError("Variant not found", 400))
    }
    await prisma.productVariant.delete({
        where:{
            id
        }
    })
    res.status(200).json({
        message:"Variant deleted Successfully",
        success:true,
    }
    )
})

// 4. update variant 
export const updateVariant = asyncHandler(async(req, res, next)=>{
    const { sku, price, stock } = req.body;
    const id = req.params.variantId;
    if(!sku && !price && !stock){
        return next(new AppError("Please provide something to update", 400))
    }
    const data ={};
    if(sku){
        const found = await prisma.productVariant.findUnique({where:{sku:sku.trim()}})
        if(found && found.id !==id){
            return next(new AppError('SKU already existed',409))
        }
        data.sku = sku.trim();
    }
    if(price){
        data.price = price;
    }
    if(stock){
        data.stock = Number(stock);
    }
    const variant = await prisma.productVariant.update({
        where:{id},
        data:data,
        include:{
            images:true,
            product:true,
        }
    })
    res.status(200).json({
        message:"variant updated successfully",
        success:true,
        data:variant
    })
})