import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { getIndiaPincode } from 'india-pincode/browser'
import {isValidPincode} from 'india-pincode'
import { prisma } from "../src/db.js";


export const createAddressess = asyncHandler(async(req, res, next)=>{
    const pincode = req.body.pincode;
    const valid = isValidPincode(pincode)
    if(!valid){
        return next(new AppError("Invalid pincode", 400))
    }
    const pin = await getIndiaPincode();
    const result = pin.getByPincode(pincode);
    const address = await prisma.deliveryPincode.create({
        data:{
            pincode,
            city:result.data.data?.[0].district,
            state:result.data.data?.[0].state,
        }
    })
    res.status(201).json({
        message:"Address fetched successfully",
        data:address
    })
})

export const checkAddress = asyncHandler(async(req, res, next)=>{
    const pincode = req.params.pincode;
    const valid = isValidPincode(pincode);
    if(!valid){
        return next(new AppError("Invalid pincode", 400))
    }
    const found = await prisma.deliveryPincode.findUnique({
        where:{
            pincode,
        }
    })
    if(!found){
        return next(new AppError("Item not Deliverable to this location",404))
    }
    res.status(200).json({
        message:"Address deliverable",
        success:true,
        data:found
    })
})