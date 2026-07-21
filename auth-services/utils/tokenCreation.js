import jwt from 'jsonwebtoken';
import 'dotenv/config'
const key = process.env.SECRET_KEY;

export const encryptRefreshToken = (user) =>{
    return jwt.sign({
        id:user.id,
        email:user.email,
    },key,{expiresIn:'7d'})
}

export const encryptAccessToken = (user) =>{
    return jwt.sign({
        id:user.id,
        email:user.email,
    },key,{expiresIn:'15m'})
}