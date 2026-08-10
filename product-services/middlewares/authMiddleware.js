import jwt from 'jsonwebtoken'
export const authMiddleware = async(req, res, next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1]
        }
        if(!token){
            return res.status(401).json({
                message:"Token is required",
                success:false,
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token ",
                success:false,
            })
        }
        req.user = decode;
        next();
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false,
        })
    }
}

export const sellerMiddleware = async(req, res, next)=>{
    try{
        if(req.user.role !== "SELLER"){
            return res.status(401).json({
                message:"You are not authorized to access this route",
                success:false,
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false,
        })
    }
}