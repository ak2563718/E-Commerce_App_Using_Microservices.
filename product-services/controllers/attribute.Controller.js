import { prisma } from '../src/db.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js'

// 1. create an attributes(Attributes names)
export const createAttributes = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const {name} = req.body;
    if(!name || !name.trim()){
        return next(new AppError("Name is required", 400))
    }
    const valid = await prisma.product.findUnique({
        where:{id}
    })
    if(!valid){
        return next(new AppError('Product id is invalid', 400)
        )
    }
    const found = await prisma.productAttribute.findFirst({
        where:{
            productId:id,
            name:name.trim()
        }
    })
    if(found){
        return next(new AppError("Attribute already written",409))
    }
    const attribute = await prisma.productAttribute.create({
        data:{
            productId:id,
            name:name.trim(),
        }
    })
    res.status(201).json({
        message:'Attribute added',
        success:true,
        data:attribute
    })
})

// 2. update an attributes
export const updateAttributes = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const { name } = req.body;
    if(!name || !name.trim()){
        return next(new AppError("Please provide name to update", 400))
    }
    const found = await prisma.productAttribute.findUnique({
        where:{id}
    })
    if(!found){
        return next(new AppError("Attributes not found", 404))
    }
    if(found.name===name.trim()){
        return next(new AppError("Attributes name is existed", 409))
    }
    const attribute = await prisma.productAttribute.update({
        where:{id},
        data:{
            name:name.trim(),
        }
    })
    res.status(200).json({
        message:"Attributes Updated",
        success:true,
        data:attribute
    })
})

// 3. Delete an Attributes
export const deleteAttributes = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const attribute = await prisma.productAttribute.findUnique({where:{id}});
    if(!attribute){
        return next(new AppError('Attributes not found',404))
    }
    await prisma.productAttribute.delete({where:{id}})
    res.status(200).json({
        message:"Attributes Deleted Successfully",
        success:true,
    })
})


// 1. create an attributes(Attributes value)
export const createAttributesvalue = asyncHandler(async(req, res, next)=>{
    const attriId = req.params.attributeId;
    console.log(attriId)
    const {value} = req.body;
    if(!value|| !value.trim()){
        return next(new AppError("Value is required", 400))
    }
    const found = await prisma.productAttribute.findFirst({
        where:{id:attriId},
    })
    if(!found){
        return next(new AppError("attribute not found", 404))
    }
    const valid = await prisma.productAttributeValue.findFirst({
        where:{
            attributeId:attriId,
            value:value.trim()
        }
    })
    if(valid){
        return next(new AppError('Value already existed', 409))
    }
    const attributes = await prisma.productAttributeValue.create({
        data:{
            attributeId:attriId,
            value:value.trim()
        },
        include:{
            attribute:true
        }
    })
    res.status(201).json({
        message:"attribute value created",
        success:true,
        data:attributes
    })
})

// 2. update an attributes (attributes value)
export const updateAttributesValue = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const {value} = req.body;
    if(!value ||!value.trim()){
        return next(new AppError("Value is required", 400))
    }
    const found = await prisma.productAttributeValue.findFirst({
        where:{
            id,
            value:value.trim()
        }
    });
    if(found){
        return next(new AppError("Value already Existed", 409))
    }
    const attribute = await prisma.productAttributeValue.update({
        where:{id},
        data:{
            value:value.trim()
        },
        include:{
            attribute:true
        }
    })
    res.status(200).json({
        message:"attribute value updated",
        success:true,
        data:attribute
    })
})

// 3. deleted an attributes (attribute value)
export const deleteAttributesvalue = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const attribute = await prisma.productAttributeValue.findUnique({where:{id}})
    if(!attribute){
        return next(new AppError("Attribute value not found", 404))
    }
    await prisma.productAttributeValue.delete({where:{id}})
    res.status(200).json({
        message:"Attributes value Deleted",
        success:true,
    })
})