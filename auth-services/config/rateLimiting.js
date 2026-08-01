import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
})

export const loginLimiter = rateLimit({
    windowMs: 15* 60 * 1000,
    max:5,
    message:{
        success:false,
        message:"Too many requests. Please try again later."
    }
})

export const singupLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max:5,
    message:{
        success:false,
        message:"Too many requests. Please try again later."
    }
})