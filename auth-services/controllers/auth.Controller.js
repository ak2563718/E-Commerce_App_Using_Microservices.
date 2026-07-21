import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import {prisma} from '../src/db.js';
import validator from 'validator'
import transport from '../config/nodemailer.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// 1. auth register
export const authRegister = asyncHandler(async(req, res, next)=>{
    const {email, password } = req.body;
    if(!email){
        return next(new AppError('Please Provide Email', 400))
    }
    const normalizedEmail= email.toLowerCase().trim();
    if(!password){
        return next(new AppError('Please Provide Password', 400))
    }
    if(!validator.isEmail(normalizedEmail)){
        return next(new AppError('Invalid Email', 400))
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
    const existingUser = await prisma.user.findUnique({
        where:{
            email:normalizedEmail,
        }
    })
    if(existingUser){
        return next(new AppError("User Already Exists", 409))
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data:{
            email: normalizedEmail,
            password: hashedPassword,
        },
        select:{
            id:true,
            email:true,
            emailverified:true,
            provider:true,
        }
    })
    const token = await jwt.sign({ id:user.id, email:user.email},process.env.SECRET_KEY,{expiresIn:'5min'})
    const verificationLink = `http://localhost:6001/auth/verify-email?token=${token}`
    await transport.sendMail({
        from:`MY-app ${process.env.EMAIL}`,
        to:normalizedEmail,
        subject:"demo-message",
        html:`just a checking message. Please click <a href="${verificationLink}">here</a> to verify your email.`

    })

    res.status(201).json({
        success:true,
        message:"User Created Successfully",
        user
    })
})

//2. auth verify email
export const authverifyEmail = asyncHandler(async(req, res, next)=>{
    const token = req.query.token;
    if(!token){
        return next(new AppError("Token is required", 400))
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded){
        return next(new AppError("Invalid Token", 401))
    }
    const user = await prisma.user.findUnique({
        where:{
            id:decoded.id
        }
    })
    if(!user){
        return next(new AppError("User not found", 404))
    }
    if(user.emailverified){
        return next(new AppError("Email already verified", 400))
    }
    await prisma.user.update({
        where:{
            id:decoded.id
        },
        data:{
            emailverified:true
        }
    })
    res.status(200).json({
        success:true,
        message:"Email verified successfully",
        
    })
})

// 2. auth login
export const authLogin = asyncHandler(async(req, res, next) =>{
    
})