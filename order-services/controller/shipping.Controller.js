import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../src/db.js';
import validator from 'validator'

export const createShippingAddress = asyncHandler(async(req, res, next)=>{
    const id = req.user.id;
    const { name, phone, area, flat , city, state, pincode, landmark, type} = req.body;
    if(!name || !phone || !area ||!flat  ||!city ||!state  ||!pincode ||!type){
        return next(new AppError('Please provide all required field',400))
    }
    if(!validator.isMobilePhone(phone.trim(),"en-IN")){
        return next(new AppError('Invalid phone number', 400))
    }
    
    const address = await prisma.shippingAddress.create({
        data:{
            userId:id,
            name,
            phone,
            area,
            flat,
            city,
            state,
            pincode,
            type,
            landmark:landmark?landmark:'null',
        }
    })
    res.status(201).json({
        message:'shipping address created',
        success:true,
        data:address
    })
})


export const getShippingAddress = asyncHandler(async(req, res, next)=>{
    const id = req.user.id;
    const address = await prisma.shippingAddress.findMany({where:{userId:id}})
    if(!address){
        return next(new AppError('No Address found', 404))
    }
    res.status(200).json({
        message:"Address found",
        success:true,
        data:address
    })
})


export const deleteShippingAddress = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const found = await prisma.shippingAddress.findUnique({where:{id}})
    if(!found){
        return next(new AppError("Address not found", 404))
    }
    await prisma.shippingAddress.delete({where:{id}})
    res.status(200).json({
        message:"Address deleted successfully",
        success:true,
        data:found
    })
})


export const updateAddress = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const { name, phone, area, flat, city, state, type, pincode, landmark}= req.body;
    if(!name && !phone && !area && !flat && !city && !state && !type &&!pincode && landmark){
        return next(new AppError("Nothing to update address", 400))
    }
    const data = {};
    if(name) data.name = name.trim();
    if(phone) {
        const trimmed = phone.trim()
        if(!validator.isMobilePhone(trimmed, 'en-IN')){
            return next(new AppError('Invalid mobile number', 400))
        }
        data.phone = trimmed;
    }
    if(area) data.area = area.trim();
    if(flat) data.flat = flat.trim();
    if(city) data.city = city.trim();
    if(state) data.state = state.trim();
    if(type) data.type = type.trim();
    if(pincode){
        const trimmed = pincode.trim();
        if(!validator.ispincode(trimmed, 'IN')){
            return next(new AppError('Postal code invalid', 400))
        }
        data.pincode = trimmed;
    }
    if(landmark) data.landmark = landmark.trim();
    const found = await prisma.shippingAddress.findUnique({where:{id}});
    if(!found){
        return next(new AppError("Address not found", 404))
    }
    const updated = await prisma.shippingAddress.update({
        where:{
            id
        },
        data:data
    })
    res.status(200).json({
        message:"Address updated successfully",
        success:true,
        data:updated
    })
})