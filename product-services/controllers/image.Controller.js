import { prisma } from '../src/db.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs'
// 1. Upload an image
export const uploadProductImages = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    console.log(req.files)
    // Check product exists
    const product = await prisma.product.findUnique({
        where: { id: productId }
    });
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    // Check files
    if (!req.files || req.files.length === 0) {
        return next(new AppError("Please upload at least one image", 400));
    }

    const imageData = [];

    for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "products"
        });

        imageData.push({
            productId,
            url: result.secure_url,
            publicId: result.public_id,
            order: i + 1,
            isPrimary: i === 0 // first image becomes primary
        });
    }

    // Save all images
    await prisma.productImage.createMany({
        data: imageData
    });

    // Return saved images
    const images = await prisma.productImage.findMany({
        where: { productId },
        orderBy: {
            order: "asc"
        }
    });
    for (const file of req.files) {
        fs.unlinkSync(file.path);
    }
    res.status(201).json({
        success: true,
        message: "Images uploaded successfully",
        data: images
    });
});

// 2. update image controller
export const updateProductImage = asyncHandler(async(req, res, next)=>{
    const id = req.params.imageId;
    const oldimages = await prisma.productImage.findUnique({
        where:{
            id,
        }
    });
    if(!images){
        return next(new AppError("No image found", 404))
    }
    await cloudinary.uploader.destroy(oldimages.publicId)
    const uploaded = await cloudinary.uploader.upload(req.file,{folder:"products"})
    const updateImage = await prisma.productImage.update({
        where:{
            id
        },
        data:{
            url:uploaded.secure_url,
            publicId:uploaded.public_id,
        }
    });
    fs.unlinkSync(req.file)
    res.status(200).json({
        message:"Image uploaded successfully",
        success:true,
        data:updateImage,
    })
})

// 3. delete image 
export const deleteProductImage = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const image = await prisma.productImage.findUnique({
        where:{
            id
        }
    });
    if(!image){
        return next(new AppError("Image not found", 404))
    }
    await cloudinary.uploader.destroy(image.publicId);
    await prisma.productImage.delete({where:{id}})
    res.status(200).json({
        message:"image deletedsuccessfully",
        success:true,
        data:image
    })
})

//1. upload product variant image
export const uploadVariantImages = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if variant exists
    const variant = await prisma.productVariant.findUnique({
        where: { id },
    });

    if (!variant) {
        return next(new AppError("Product variant not found", 404));
    }

    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
        return next(new AppError("Please upload at least one image", 400));
    }

    const imagesToCreate = [];

    for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "product-variants",
        });

        imagesToCreate.push({
            variantId: id,
            url: result.secure_url,
            publicId: result.public_id,
        });
    }

    await prisma.productVariantImage.createMany({
        data: imagesToCreate,
    });

    const images = await prisma.productVariantImage.findMany({
        where: {
            variantId: id,
        },
    });
    for (const file of req.files) {
        fs.unlinkSync(file.path);
    }
    res.status(201).json({
        success: true,
        message: "Variant images uploaded successfully",
        data: images,
    });
});

// 2. update product variant images
export const updateProductVariantImage = asyncHandler(async(req, res, next)=>{
    const id = req.params.imageId;
    const oldimages = await prisma.productImage.findUnique({
        where:{
            id,
        }
    });
    if(!images){
        return next(new AppError("No image found", 404))
    }
    await cloudinary.uploader.destroy(oldimages.publicId)
    const uploaded = await cloudinary.uploader.upload(req.file,{folder:"products"})
    const updateImage = await prisma.productImage.update({
        where:{
            id
        },
        data:{
            url:uploaded.secure_url,
            publicId:uploaded.public_id,
        }
    });
    fs.unlinkSync(req.file)
    res.status(200).json({
        message:"Image uploaded successfully",
        success:true,
        data:updateImage,
    })
})

// 3. delete variants image
export const deleteProductVariantImage = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const image = await prisma.productImage.findUnique({
        where:{
            id
        }
    });
    if(!image){
        return next(new AppError("Image not found", 404))
    }
    await cloudinary.uploader.destroy(image.publicId);
    await prisma.productImage.delete({where:{id}})
    res.status(200).json({
        message:"image deletedsuccessfully",
        success:true,
        data:image
    })
})