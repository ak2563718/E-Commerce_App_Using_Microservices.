import jwt from 'jsonwebtoken';
import 'dotenv/config'
const key = process.env.SECRET_KEY;

export const encryptRefreshToken = (user,rolename) =>{
    return jwt.sign({
        id:user.id,
        email:user.email,
        role:rolename
    },key,{expiresIn:'7d'})
}

export const encryptAccessToken = (user,rolename) =>{
    return jwt.sign({
        id:user.id,
        email:user.email,
        role:rolename,
    },key,{expiresIn:'2m'})
}