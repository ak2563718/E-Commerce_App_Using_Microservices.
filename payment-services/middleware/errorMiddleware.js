export const errorMiddleware = (err, req, res, next)=>{
    const statusCode = err.statusCode;
    res.status(statusCode).json({
        message:err.message,
        success:false,
    })
    console.log(err)
}