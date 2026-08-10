import jwt from 'jsonwebtoken'

export const authMiddleware = async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return res.status(401).json({
            message:"token is required",
            success:false,
        })
    }
    try {
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            message:"Invalid or expire access token",
            success:false,
        })
    }
}