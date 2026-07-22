import { prisma } from "../src/db.js";
import {asyncHandler} from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import slugify from 'slugify'
// 1. Add Product 
export const createProduct = asyncHandler(async(req, res, next)=>{
    const { name, description, sku, categoryId } = req.body;
    if(!name || !name.trim()){
        return next(new AppError('Name is Required', 400))
    }
    if(!description || !description.trim()){
        return next(new AppError("Description is required", 400))
    }
    if(!sku || !sku.trim()){
        return next(new AppError("sku is required", 400))
    }
    const categoryCheck = await prisma.category.findUnique({
        where:{
            id:categoryId
        }
    })
    if(!categoryCheck){
        return next(new AppError("Category not found", 404))
    }
    const baseslug = slugify(name, {
        lower:true,
        strict:true,
        trim:true,
    })
    let slug = baseslug;
    let count = 1;
    while(await prisma.product.findUnique({where:{slug}})){
        slug = `${baseslug}-${count++}`;
    }
    const found = await prisma.product.findUnique({where:{sku}});
    if(found){
        return next(new AppError('SKU already exists', 400))
    }
    const product = await prisma.product.create({
        data:{
            name:name.trim(),
            description:description?.trim(),
            sku:sku.trim(),
            slug,
            categoryId,
        }
    })
    res.status(201).json({
        message:"Product details added",
        success:true,
        data:product,
    })
})

// 2. Get all Product 
export const getProduct = asyncHandler(async(req, res, next)=>{
    const product = await prisma.product.findMany({
        include:{
            category:true,
            images:true,
            attributes:true,
            variants:true,
            brand:true,
        }
    })
    if(!product ){
        return next(new AppError("Product not found", 404))
    }
    res.status(200).json({
        message:"Product found",
        success:true,
        data:product,
    })
})

// 3. Get Product by Id:
export const getProdctbyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const product = await prisma.product.findUnique({
        where:{
            id
        },
        include:{
            category:true,
            brand:true,
            images:true,
            variants:true,
            attributes:true,
        }
    })
    if(!product){
        return next(new AppError("Product Not found", 404))
    }
    res.status(200).json({
        message:"Product found",
        success:true,
        data:product
    })
})

// 4. Get Product by Slug:
export const getProductbySlug = asyncHandler(async(req, res, next)=>{
    const slug = req.params.slug;
    const product = await prisma.product.findUnique({
        where:{
            slug
        },
        include:{
            category:true,
            images:true,
            brand:true,
            variants:true,
            attributes:true,
        }
    })
    if(!product){
        return next(new AppError("Product not found", 404))
    }
    res.status(200).json({
        message:"Product found",
        success:true,
        data:product
    })
})

// 5. Delete Product by Id:
export const deleteProductbyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const product = await prisma.product.findUnique({
        where:{
            id
        }
    })
    if(!product){
        return next(new AppError("Product not found", 404))
    }
    await prisma.product.delete({
        where:{
            id
        }
    })
    res.status(200).json({
        message:"Product Deleted Successfully",
        success:true,
    })
})

// 6. update Product by Id:
export const updateProduct = asyncHandler(async(req, res, next)=>{
    const id = req. params.id;
    const { name, description, sku, categoryId } = req.body;
    if(!name && !description && !sku && !categoryId){
        return next(new AppError("Please provide something to update", 400))
    }
    let data={};
    if(name){
        let baseslug = slugify(name, {
            lower:true,
            strict:true,
            trim:true,
        })
        let slug = baseslug;
        let count = 1;
       let existing = await prisma.product.findUnique({
        where:{slug}
       })
       while(existing && existing.id !==id){
         slug = `${baseslug}-${count++}`;

        existing = await prisma.product.findUnique({
        where: { slug }
         });
       }
       data.name = name.trim();
       data.slug = slug;
    }
    if(description){
        data.description = description.trim();
    }
    if(sku){
        const found=await prisma.product.findUnique({where:{sku:sku.trim()}})
        if(found && found.id !==id){
            return next(new AppError("SKU already existed", 400))
        }
        data.sku = sku.trim();
    }
    if(categoryId){
        const found = await prisma.category.findUnique({
            where:{
                id:categoryId
            }
        })
        if(!found){
            return next(new AppError("Category not found", 404))
        }
        data.categoryId = categoryId;
    }
    const product = await prisma.product.findUnique({
        where:{
            id
        }
    })
    if(!product){
        return next(new AppError("Product not found", 404))
    }
    const updated=await prisma.product.update({
        where:{
            id
        },
        data,
    })
    res.status(200).json({
        message:"Product updated successfully",
        success:true,
        data:updated
    })
})