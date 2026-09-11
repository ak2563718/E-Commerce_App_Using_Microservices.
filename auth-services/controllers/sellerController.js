import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../src/db.js";
import validator from 'validator'
import bcrypt from 'bcrypt'

// 1. create seller signup controller
export const createSellerSignup = asyncHandler(async(req, res, next)=>{
    const {
        businessName,
        businessEmail,
        businessPhone,
        gstNumber,
        panNumber,
        businessAddress,
        description,
        password
    } = req.body;
    if(!businessName || !businessEmail ||!businessPhone ||!password){
        return next(new AppError("Please fill the required field", 400))
    }
    const normalizedEmail = businessEmail.toLowerCase().trim()
    if(!validator.isEmail(normalizedEmail)){
        return next(new AppError("Invalid Email", 400))
    }
    const phone = businessPhone.trim()
    if(!validator.isMobilePhone(phone, "en-IN")){
        return next(new AppError("Invalid Phone", 400))
    }
    if(password.length < 8){
            return next(new AppError("Password must be at least 8 characters long.", 400))
        }
        else if(!/[a-z]/.test(password)){
            return next(new AppError('Password must contain at least one Lowercase letter', 400))
        }
        else if(!/[A-Z]/.test(password)){
            return next(new AppError("Password must contain at least one Uppercase letter", 400))
        }
        else if(!/[0-9]/.test(password)){
            return next(new AppError("Password must contain at least one digit", 400))
        }
        else if(!/[^a-zA-Z0-9]/.test(password)){
            return next(new AppError("Password must contain at least one special character", 400))
        }
    const existingSeller = await prisma.seller.findUnique({
        where:{
            businessEmail:normalizedEmail
        }
        })
    if(existingSeller){
        return next(new AppError("Seller already registered", 409))
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const seller = await prisma.seller.create({
        data:{
            businessName,
            businessEmail:normalizedEmail,
            businessPhone:phone,
            gstNumber:gstNumber?gstNumber.trim():null,
            panNumber:panNumber?panNumber.trim():null,
            businessAddress:businessAddress?businessAddress:null,
            description:description?description.trim():null,
            role:"SELLER",
            password:hashedPassword,
            status:"PENDING",
        },
        omit:{
            password:true,
        }
    }) 
    res.status(201).json({
        message:"Seller Registration Completed",
        success:true,
        data:seller,
    })
})


// 2. update seller status
export const updateSellerStatus = asyncHandler(async(req, res, next)=>{
    const sellerId = req.params.id;
    const { status } = req.body;
    const seller = await prisma.seller.findUnique({
        where:{
            id:sellerId,
        }
    })
    if(!seller){
        return next(new AppError("Seller not found", 404))
    }
    const data = await prisma.seller.update({
        where:{id:sellerId},
        data:{
            status
        }
    })
    res.status(200).json({
        message:"Seller status updated",
        data,
        success:true,
    })
})