import { prisma } from "../src/db.js";
import {asyncHandler} from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

// 1. Add Product 
export const product_Add = asyncHandler(async(req, res, next)=>{
    const { name, slug, description, sku, }
    const product = await prisma.product.create()
})