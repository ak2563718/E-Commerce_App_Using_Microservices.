import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:['http://localhost:3000','http://localhost:6001'],
    credentials:true,
}));
app.use(cookieParser())

// 1. Authentication service
app.use("/auth", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.AUTH_URL}${req.originalUrl}`,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
         Authorization: req.headers.authorization,
         Cookie: req.headers.cookie,
      },
    });
    // Set cookie only if auth service sends a refresh token
    if (response.data.refreshToken) {
      res.cookie("refresh_token", response.data.refreshToken, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    if(req.path==="/logout"){
      res.clearCookie("refresh_token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
      })
    }
    return res.status(response.status).json(response.data);
  } catch (error) {
    // Auth service returned an HTTP error (400, 401, 404, etc.)
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    // Network error or auth service is down
    if (error.request) {
      return res.status(503).json({
        success: false,
        message: "Auth service is unavailable",
      });
    }
    // Unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

app.use('/api',async(req, res)=>{
  try {
     const response = await axios({
      method:req.method,
      url:`${process.env.PRODUCT_URL}${req.originalUrl}`,
      data:req.body,
      headers:{
        ...req.headers,
      },
     })
     return res.status(response.status).json(response.data)
  } catch (error) {
     // Auth service returned an HTTP error (400, 401, 404, etc.)
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    // Network error or auth service is down
    if (error.request) {
      return res.status(503).json({
        success: false,
        message: "Auth service is unavailable",
      });
    }
    // Unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
})

app.use('/profile',async(req, res)=>{
  try {
    const response = await axios({
       method:req.method,
       url:`${process.env.PROFILE_URL}${req.originalUrl}`,
       req:req.data,
       headers: {
        "Content-Type": "application/json",
         Authorization: req.headers.authorization,
         Cookie: req.headers.cookie,
      },
    })
    return res.status(response.status).json(response.data);
  } catch (error) {
        // Auth service returned an HTTP error (400, 401, 404, etc.)
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    // Network error or auth service is down
    if (error.request) {
      return res.status(503).json({
        success: false,
        message: "Auth service is unavailable",
      });
    }
    // Unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
})

app.use('/cart',async(req, res)=>{
  console.log(`${process.env.CART_URL}${req.originalUrl}`)
  try {
    const response = await axios({
      method:req.method,
      url:`${process.env.CART_URL}${req.originalUrl}`,
      req:req.data,
      headers: {
        "Content-Type": "application/json",
         Authorization: req.headers.authorization,
         Cookie: req.headers.cookie,
      },
    })
    return res.status(response.status).json(response.data)
  } catch (error) {
         // Auth service returned an HTTP error (400, 401, 404, etc.)
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    // Network error or auth service is down
    if (error.request) {
      return res.status(503).json({
        success: false,
        message: "Auth service is unavailable",
      });
    }
    // Unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
})

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})