import express from 'express';
import { authProxy, cartProxy, productProxy, userProxy } from '../controller/api.Controller.js';
import { createProxyMiddleware } from 'http-proxy-middleware'

const router = express.Router();
router.use('/auth',authProxy)
router.use('/cart',cartProxy)
router.use(`/product/products/:id/images`,(req, res, next) => {
    console.log("🔥 IMAGE PROXY ROUTE HIT");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Params:", req.params);

    next();
  },
    createProxyMiddleware({
        target:`http://localhost:6002`,
        changeOrigin:true,
    })
)
router.use('/product',productProxy)
router.use('/user',userProxy)

export default router;