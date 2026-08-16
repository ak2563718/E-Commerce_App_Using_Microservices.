import { prisma } from "../src/db.js";
import {asyncHandler} from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import slugify from 'slugify'

// 1. Add Product (protected controller)
export const createProduct = asyncHandler(async(req, res, next)=>{
    const sellerId = req.user.id;
    const { name, description, sku, categoryId, brandId, seoTitle, seoDescription, weight, length, width, height, taxPercentage } = req.body;
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
    if(brandId){
        const brandcheck = await prisma.brand.findUnique({
            where:{
                id:brandId
            }
        })
        if(!brandcheck){
            return next(new AppError("Brand not found", 404))
        }
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
            sellerId,
            name:name.trim(),
            description:description?.trim(),
            shortDescription:description.trim().split(".")[0],
            sku:sku.trim(),
            slug,
            categoryId,
            brandId:brandId || null,
            seoTitle:seoTitle?.trim() || null,
            seoDescription:seoDescription?.trim() || null,
            weight:weight != null ? Number(weight):null,
            length:length != null ? Number(length):null,
            width:width != null ? Number(width):null,
            height: height !=null ? Number(height):null,
            taxPercentage: taxPercentage !=null ? Number(taxPercentage):null,
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

// 2.1. Get all Product of Seller (protected controller)
export const getProductofSeller = asyncHandler(async(req, res, next)=>{
    const sellerId = req.user.id;
    const product = await prisma.product.findMany({
        where:{
            sellerId,
        },
        include:{
            images:true,
            variants:true,
            attributes:true,
        }
    });
    if(!product){
        return next(new AppError("Prodct not found", 404))
    }
    res.status(200).json({
        message:'Product found',
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
            category:{
                include:{
                    parent:true,
                }
            },
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

// 5. Delete Product by Id: (protected controller)
export const deleteProductbyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const product = await prisma.product.findUnique({
        where:{
            id,
        }
    })
    if(!product){
        return next(new AppError("Product not found", 404))
    }
    const data=await prisma.product.delete({
        where:{
            id
        }
    })
    res.status(200).json({
        message:"Product Deleted Successfully",
        success:true,
        data, 
    })
})

// 6. update Product by Id: (protected controller)
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


// 7. Search product through query
export const serachProduct = asyncHandler(async(req, res, next)=>{
    const query = req.query.search;
    console.log(query)
    const products = await prisma.product.findMany({
        where:{
            OR:[
                {
                    name:{
                        contains:query,
                        mode:'insensitive',
                    }
                },
                {
                category:{
                    name:{
                        contains:query,
                        mode:'insensitive'
                    }
                },
            },
            ]
        },
        include:{
            images:true,
            variants:true,
            attributes:true,
            reviews:true,
            }                     
    });
    if(!products){
        return next(new AppError("Proudct not found", 404))
    }
    res.status(200).json({
        message:"Product found",
        success:true,
        data:products,
    })
})