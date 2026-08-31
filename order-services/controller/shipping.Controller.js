import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../src/db.js';
import validator from 'validator'

export const createShippingAddress = asyncHandler(async(req, res, next)=>{
    const id = req.user.id;
    const { fullName, phone, addressLine1, addressLine2, city, state, country, postalCode, landmark} = req.body;
    if(!fullName || !phone || !addressLine1  ||!city ||!state ||!country ||!postalCode ){
        return next(new AppError('Please provide all required field',400))
    }
    const address = await prisma.shippingAddress.create({
        data:{
            userId:id,
            fullName,
            phone,
            addressLine1,
            addressLine2:addressLine2?addressLine2:'null',
            city,
            state,
            country,
            postalCode,
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
    const { fullName, phone, addressLine1, addressLine2, city, state, country, postalCode, landmark}= req.body;
    if(!fullName && !phone && !addressLine1 && !addressLine2 && !city && !state && !country &&!postalCode && landmark){
        return next(new AppError("Nothing to update address", 400))
    }
    const data = {};
    if(fullName) data.fullName = fullName.trim();
    if(phone) {
        const trimmed = phone.trim()
        if(!validator.isMobilePhone(trimmed, 'en-IN')){
            return next(new AppError('Invalid mobile number', 400))
        }
        data.phone = trimmed;
    }
    if(addressLine1) data.addressLine1 = addressLine1.trim();
    if(addressLine2) data.addressLine2 = addressLine2.trim();
    if(city) data.city = city.trim();
    if(state) data.state = state.trim();
    if(country) data.country = country.trim();
    if(postalCode){
        const trimmed = postalCode.trim();
        if(!validator.isPostalCode(trimmed, 'IN')){
            return next(new AppError('Postal code invalid', 400))
        }
        data.postalCode = trimmed;
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