import axios from "axios";

export const authProxy = async(req, res)=>{
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
}

export const userProxy = async(req, res)=>{
    try {
    const response = await axios({
       method:req.method,
       url:`${process.env.PROFILE_URL}${req.originalUrl}`,
       data:req.body,
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
}

export const productProxy = async(req, res)=>{
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
}

export const cartProxy = async(req, res)=>{
     try {
    const response = await axios({
      method:req.method,
      url:`${process.env.CART_URL}${req.originalUrl}`,
      data:req.body,
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
}

export const orderProxy = async(req, res)=>{
  try {
    const response = await axios({
      method:req.method,
      url:`${process.env.ORDER_URL}${req.originalUrl}`,
      data:req.body,
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
}