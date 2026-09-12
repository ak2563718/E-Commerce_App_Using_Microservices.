import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../src/db.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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


// 3. create seller login controller
export const createSellerLogin = asyncHandler(async(req, res, next)=>{
    const { email, password} = req.body;
    if(!email){
        return next(new AppError("Please Enter Email", 400))
    }
    if(!password){
        return next(new AppError("Please Provide password", 400))
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existingSeller = await prisma.seller.findUnique({
        where:{businessEmail:normalizedEmail},omit:{password:true}
    })
    if(!existingSeller){
        return next(new AppError("Seller not Registered", 401))
    }
    if(existingSeller.status === "PENDING"){
        return next(new AppError("Seller not Approved", 401))
    }
    const matched = await bcrypt.compare(password, existingSeller.password)
    if(!matched){
        return next(new AppError("Wrong password!", 400))
    }
    const sellerRefreshToken = jwt.sign({
        id:existingSeller.id,
        email:existingSeller.businessEmail,
        name:existingSeller.businessName,
        role:existingSeller.role
    })
    const sellerAccessToken = jwt.sign({
        id:existingSeller.id,
        email:existingSeller.businessEmail,
        role:existingSeller.role,
    })
    await prisma.refreshToken.deleteMany({where:{sellerId:existingSeller.id}})
    const s_token =await prisma.refreshToken.create({data:{token:sellerRefreshToken,sellerId:existingSeller.id}})
    res.cookie('sid',sellerRefreshToken,{
        httpOnly:true,
        sameSite:'lax',
        secure:false,
        maxAge:24* 60 * 60* 1000,
    })
    res.status(200).json({
        message:"Seller login Successfully",
        success:true,
        data:existingSeller,
        sellerAccessToken,
        sellerRefreshToken
    })
})


// 4. create seller logout controller
export const createSellerLogout = asyncHandler(async(req, res, next)=>{
    const token = req.cookies?.sid;
    if(!token){
        return next(new AppError("Seller not authorized", 401))
    }
    const validate = await prisma.refreshToken.findUnique({
        token,
    })
    if(!validate){
        return next(new AppError("Invalid token", 401))
    }
    await prisma.refreshToken.delete({where:{token}})
    res.clearCookie('sid',{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
    })
    res.status(200).json({
        message:"Seller logout successfully",
        success:true,
    })
})