import { prisma } from "../src/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import slugify from 'slugify';

//1 . Create Category for Products
export const createCategories = asyncHandler(async(req, res, next)=>{
    const { name, description,image , parentId} = req.body;
    if(!name || !name.trim()){
        return next(new AppError("Name is a required Field", 400))
    }
    const baseslug= slugify(name,{
        lower:true,
        strict:true,
        trim:true,
    })
    let slug = baseslug;
    let count = 1;
    while(await prisma.category.findUnique({where:{slug}})){
        slug = `${baseslug}-${count++}`;
    }
    if(parentId){
        const parentCategory = await prisma.category.findUnique({
            where:{
                id:parentId
            }
        })
        if(!parentCategory){
        return next(new AppError("Parent category not found", 404))
    }
    }
    const category = await prisma.category.create({
        data:{
            name:name.trim(),
            slug,
            description,
            image,
            parentId:parentId || null,
        }
    }
    )
    res.status(201).json({
        message:"Category created successfully",
        success:true,
        data:category,
    })
})

// 2. Get all categories
export const getCategory = asyncHandler(async(req, res, next)=>{
    const category = await prisma.category.findMany({include:{parent:true,children:true}})
    if(!category){
        return next(new AppError("Category not Found", 404))
    }
    res.status(200).json({
        message:"Category found",
        success:true,
        data:category,
    })
})

// 3. Get Category with their Id:
export const categorybyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const category = await prisma.category.findUnique({
        where:{
            id
        },
        include:{
            parent:true,
            children:true,
        }
    })
    if(!category){
        return next(new AppError("Category not found", 404))
    }
    res.status(200).json({
        message:"Category found",
        success:true,
        data:category,
    })
})


// 4. Delete Category with their Id:
export const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        return next(new AppError("Category not found.", 404));
    }
    await prisma.category.delete({
        where: {
            id,
        },
    });
    res.status(200).json({
        success: true,
        message: "Category deleted successfully.",
    });
});

// 5. Update Category with their Id:
export const updateCategory = asyncHandler(async(req, res, next)=>{

})