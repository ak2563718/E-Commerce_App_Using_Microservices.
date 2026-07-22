import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../src/db.js";
import slugify from 'slugify';

//1. Create brands details:
export const createBrand = asyncHandler(async(req, res, next)=>{
    const { name, logo} = req.body;
    if(!name || !name.trim()){
        return next(new AppError("Name is a required field", 400))
    }
    const baseslug = slugify(name,{
        lower:true,
        trim:true,
        strict:true,
    })
    let slug = baseslug;
    let count = 1;
    while(await prisma.brand.findUnique({where:{slug}})){
        slug = `${baseslug}-${count}`;
        count++;
    }
    const brand = await prisma.brand.create({
        data:{
            name:name.trim(),
            slug,
            logo,
        }
    })
    res.status(201).json({
        message:"Brand created successfully",
        success:true,
        data:brand,
    })
});

// 2. Get all Brand Details:
export const getBrand = asyncHandler(async(req, res, next)=>{
    const brand = await prisma.brand.findMany({})
    if(!brand){
        return next(new AppError('Brand not found', 404))
    }
    res.status(200).json({
        message:"Brand found",
        success:true,
        data:brand,
    })
})

// 3. Get brand with Id:
export const getbyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const brand = await prisma.brand.findUnique({
        where:{
            id
        }
    })
    if(!brand){
        return next(new AppError("Brand not found", 404))
    }
    res.status(200).json({
        message:"Brand found",
        success:true,
        data:brand,
    })
})

// 4. Delete brand with id:
export const deleteBrand = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const found = await prisma.brand.findUnique({
        where:{
            id
        }
    })
    if(!found){
        return next(new AppError("Brand not found", 404))
    }
    await prisma.brand.delete({
        where:{
            id
        }
    })
    res.status(200).json({
        message:"Brand Deleted Successfully",
        success:true,
    })
})

// 5. update brand with id:
export const updateBrand = asyncHandler(async (req, res, next) => {
    const { name, logo } = req.body;

    const existingBrand = await prisma.brand.findUnique({
        where: {
            id: req.params.id,
        },
    });

    if (!existingBrand) {
        return next(new AppError("Brand not found.", 404));
    }

    const data = {};

    if (name) {
        const baseSlug = slugify(name, {
            lower: true,
            trim: true,
            strict: true,
        });

        let slug = baseSlug;
        let count = 1;

        while (true) {
            const brand = await prisma.brand.findUnique({
                where: { slug },
            });

            if (!brand || brand.id === req.params.id) {
                break;
            }

            slug = `${baseSlug}-${count++}`;
        }

        data.name = name.trim();
        data.slug = slug;
    }

    if (logo) {
        data.logo = logo.trim();
    }

    if (Object.keys(data).length === 0) {
        return next(new AppError("Nothing to update.", 400));
    }

    const brand = await prisma.brand.update({
        where: {
            id: req.params.id,
        },
        data,
    });

    res.status(200).json({
        success: true,
        message: "Brand updated successfully.",
        data: brand,
    });
});