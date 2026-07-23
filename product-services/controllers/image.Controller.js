import { prisma } from '../src/db.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs'
// 1. Upload an image
export const uploadProductImages = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;

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
    fs.unlinkSync(req.files)
    res.status(201).json({
        success: true,
        message: "Images uploaded successfully",
        data: images
    });
});

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
    fs.unlinkSync(req.files)
    res.status(201).json({
        success: true,
        message: "Variant images uploaded successfully",
        data: images,
    });
});