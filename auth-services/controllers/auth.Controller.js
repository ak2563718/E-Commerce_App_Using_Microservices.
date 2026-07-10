import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import {prisma} from '../src/db.js';
import validator from 'validator'

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

    res.status(201).json({
        success:true,
        message:"User Created Successfully",
        user
    })
})