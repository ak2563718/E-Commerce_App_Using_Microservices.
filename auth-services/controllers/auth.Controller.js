import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import {prisma} from '../src/db.js';
import validator from 'validator'
import transport from '../config/nodemailer.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { encryptAccessToken, encryptRefreshToken } from '../utils/tokenCreation.js';
import crypto from 'crypto'
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
        if(existingUser.emailverified){
            return next(new AppError("User already Exist", 409))
        }else{
            const token = await jwt.sign({id:existingUser.id,email:existingUser.email},process.env.SECRET_KEY,{expiresIn:'5m'})
            const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`
            await transport.sendMail({
                from:`MY-app ${process.env.EMAIL}`,
                to:normalizedEmail,
                subject:"demo-message",
                html:`Re-send Verification link to verify-email. Please click <a href="${verificationLink}">here</a> to verify your email.`
            })
            return res.status(200).json({
                success: true,
                message: "Your email is not verified. A new verification email has been sent."
            });
        }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = await prisma.role.findFirst({
        where:{
            name:"USER"
        },
    })
    if(!userRole){{
        return next(new AppError("User role not defined", 404))
    }}
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
    await prisma.userRole.create({
        data:{
            userId:user.id,
            roleId:userRole.id,
        }
    })
    const token = await jwt.sign({ id:user.id, email:user.email},process.env.SECRET_KEY,{expiresIn:'5m'})
    const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`
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

// 1.1 seller registration
export const sellerSignup = asyncHandler(async (req, res, next) => {
    const userId = req.user.id; // Set by authentication middleware

    const {
        businessName,
        businessEmail,
        businessPhone,
        gstNumber,
        panNumber,
        businessAddress,
        description,
    } = req.body;

    // Check if already a seller
    const existingSeller = await prisma.seller.findUnique({
        where: {
            userId:userId,
        },
    });

    if (existingSeller) {
        return next(new AppError("Seller profile already exists.", 409));
    }

    // Validation
    if (!businessName || businessName.trim().length < 3) {
        return next(
            new AppError("Business name must be at least 3 characters.", 400)
        );
    }

    if (businessEmail && !validator.isEmail(businessEmail)) {
        return next(new AppError("Invalid business email.", 400));
    }

    const roles = await prisma.role.findFirst({
        where:{
            name:"SELLER"
        }
    })
    if(!roles){
        return next(new AppError('User not defined', 404))
    }
    console.log("roles of ",roles)
    const seller = await prisma.seller.create({
        data: {
            userId,
            businessName: businessName.trim(),
            businessEmail: businessEmail?.trim().toLowerCase(),
            businessPhone:businessPhone || null,
            gstNumber:gstNumber || null,
            panNumber:panNumber || null,
            businessAddress:businessAddress || null,
            description:description || null,
            // status defaults to PENDING
        },
    });

    await prisma.userRole.update({
        where:{
            userId,
        },
        data:{
            roleId:roles.id,
        }
    })

    res.status(201).json({
        success: true,
        message:
            "Seller application submitted successfully. Waiting for admin approval.",
        seller,
    });
});

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
    res.redirect('http://localhost:3000/auth/verify-email')
})

// 3. auth login
export const authLogin = asyncHandler(async(req, res, next) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError("Please Provide Both Email & Password", 400))
    }
    const normalizedEmail = email.trim().toLowerCase();
    if(!validator.isEmail(normalizedEmail)){
        return next(new AppError("Inavalid Email", 400))
    }
    const user = await prisma.user.findUnique({
        where:{
            email:normalizedEmail
        },
        include:{
            role:true,
            seller:true,
        }
    })
    if(!user){
        return next(new AppError("Email is Not Registered on our Platfrom",401))
    }
    if(!user.emailverified){
        return next(new AppError("Please verify your email before loggin in ",401))
    }
    const roleId = user.role[0].roleId;
    const userRole = await prisma.role.findFirst({
        where:{
            id:roleId
        }
    })
    if(!userRole){
        return next(new AppError("user role not found", 404))
    }
    const matched = await bcrypt.compare(password,user.password);
    if(!matched){
        return next(new AppError("Wrong password!", 400))
    }
    const refreshToken = await encryptRefreshToken(user,userRole.name);
    const accessToken = await encryptAccessToken(user,userRole.name);
    await prisma.refreshToken.deleteMany({
        where:{
            userId:user.id
        }
    })
    const r_token= await prisma.refreshToken.create({
        data:{
            token:refreshToken,
            userId:user.id,
            expiresAt: new Date(Date.now()+7*24*60*60*1000)
        }
    });
    res.cookie('refresh_token',refreshToken,{
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure:false,
        sameSite:"lax",
    });
    const {password:_,...safedata} = user;
    res.status(200).json({
        message:"User logged in Successfully",
        success:true,
        user:safedata,
        r_token,
        refreshToken,
        accessToken
    })
})

// 4. auth logout
export const authLogout = asyncHandler(async(req, res, next)=>{
    const token = req.cookies?.refresh_token;
    if(!token){
        return next(new AppError("User Not Logged in", 401))
    }
    const validate = await prisma.refreshToken.findUnique({
        where:{
            token
        }
    })
    if(!validate){
        return next(new AppError("Invalid Token", 401))
    }
    const r_token = await prisma.refreshToken.delete({
        where:{
            token
        }
    })
    res.clearCookie('refresh_token',{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
    })
    res.status(200).json({
        message:"User logged out",
        success:true,
    })
})


// 5. refresh access-token
export const auth_refresh_AccessToken = asyncHandler(async(req, res, next)=>{
    const token = req.cookies?.refresh_token;
    if(!token){
        return next(new AppError("User not Logged in", 401))
    }
    const r_token = await prisma.refreshToken.findUnique({
        where:{
            token
        }
    })
    if(!r_token){
        return next(new AppError("Token not found in Database", 401))
    }
   const decoded = await jwt.verify(token,process.env.SECRET_KEY);
   await prisma.refreshToken.delete({
    where:{
        token
    }
   });
   const user = await prisma.user.findUnique({
    where:{
        id:decoded.id
    }
   })
   const refreshToken = await encryptRefreshToken(user);
   const accessToken = await encryptAccessToken(user);
   await prisma.refreshToken.create({
    data: {
        token: refreshToken,
        userId: decoded.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
   res.cookie('refresh_token',refreshToken,{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge: 7 * 24* 60* 60* 1000,
   });
   res.status(200).json({
    message:"Access Token renewed",
    success:true,
    accessToken,
    refreshToken
   })
})


// 6. check session 
export const auth_CheckSession = asyncHandler(async(req, res, next)=>{
    const token = req.cookies?.refresh_token;
    if(!token){
        return next(new AppError('User not logged in', 401))
    }
    const decode = await jwt.verify(token,process.env.SECRET_KEY)
    console.log("decode data is",decode)
    const r_token = await prisma.refreshToken.findUnique({
        where:{
            token
        }
    })
    if(!r_token){
        return next(new AppError("Token not found", 401))
    }
    const user = await prisma.user.findUnique({
        where:{
            id:r_token.userId,
        }
    })
    const accessToken = await encryptAccessToken(user,decode.role);
    res.status(200).json({
        message:"User logged in ",
        success:true,
        accessToken,
        data:decode,
    })
})


// 7. forgot User Password
export const auth_forgotPassword = asyncHandler(async(req, res, next)=>{
    const {email} = req.body;
    if(!email){
        return next(new AppError("Please Provide Email", 400))
    }
    const normalizedEmail = email.trim().toLowerCase();
    if(!validator.isEmail(normalizedEmail)){
        return next(new AppError("Invalid Email" , 400))
    } 
    const user = await prisma.user.findUnique({
        where:{
            email:normalizedEmail
        }
    });
    if(!user){
        return next(new AppError("Email not Registered", 400))
    }
    await prisma.passwordResetToken.deleteMany({
        where:{
            userId:user.id
        }
    })
    const token = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(token).digest("hex")
    const resetToken = await prisma.passwordResetToken.create({
        data:{
            token:hashed,
            userId:user.id,
            expiresAt: new Date(Date.now() +  10 * 60 * 1000)
        }
    })
    const verificationLink = `http://localhost:3000/auth/reset-password?token=${token}`
    await transport.sendMail({
        from:`MY-app ${process.env.EMAIL}`,
        to:normalizedEmail,
        subject:"Password Reset",
        html:`just a checking message. Please click <a href="${verificationLink}">here</a> to reset your password.`
    })
    res.status(200).json({
        messsage:"Password Reset link sent to your email",
        success:true,
    })
})


// 8. Reset Password
export const auth_resetPassword = asyncHandler(async(req, res, next)=>{
    const token = req.query.token;
    if(!token){
        return next(new AppError("Token is required", 400))
    }
    const { password } = req.body;
    if(!password){
        return next(new AppError("Please enter the Password first"))
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
    const hashtoken = crypto.createHash('sha256').update(token).digest('hex');
    const r_pass = await prisma.passwordResetToken.findUnique({
       where:{
         token:hashtoken
       }
    })
    if (r_pass.expiresAt < new Date()) {
    await prisma.passwordResetToken.delete({
        where: {
            token: hashtoken,
        },
    });
        return next(new AppError("Reset link has expired", 400));
    }
   const hashedPassword = await bcrypt.hash(password.trim(),10);
    const user = await prisma.user.update({
        where:{
            id:r_pass.userId,
        },
        data:{
            password:hashedPassword,
        }
    });
    await prisma.passwordResetToken.deleteMany({
        where:{
            userId:r_pass.userId,
        }
    })
    res.status(200).json({
        message:"Password reset Successfully",
        success:true,
    })
})


// create user role
export const createRole = asyncHandler(async(req, res, next)=>{
    const { role, description } = req.body;
    const roles = await prisma.role.create({
        data:{
            name:role,
            description:description || "",
        }
    })
    res.status(201).json({
        message:"User role created",
        success:true,
        data:roles
    })
})