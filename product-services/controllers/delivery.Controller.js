import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { getIndiaPincode } from 'india-pincode/browser'
import { prisma } from "../src/db.js";


export const createAddressess = asyncHandler(async(req, res, next)=>{
    const pincode = req.body.pincode;
    const valid = isValidPincode(pincode)
    if(!valid){
        return next(new AppError("Invalid pincode", 400))
    }
    const pin = await getIndiaPincode();
    const result = pin.getByPincode(pincode);
    res.status(201).json({
        message:"Address fetched successfully",
        data:{
            city:result.data.data?.[0].district,
            state:result.data.data?.[0].state,
        }
    })
})