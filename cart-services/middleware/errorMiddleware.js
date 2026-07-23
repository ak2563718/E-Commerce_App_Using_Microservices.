export const errorMiddleware = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message:err.message || "Internal server Error!",
        success:false,
    })
    console.log(err)
}