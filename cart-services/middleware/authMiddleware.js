import jwt from 'jsonwebtoken'
export const authMiddleware = async(req, res, next)=>{
     try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1]
        }
        if(!token){
            res.status(401).json({
                message:"token not found",
                success:false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode;
        next();
     } catch (error) {
        res.status(500).json({
            message:"Internal server Error!",
            success:false,
        })
     }
}