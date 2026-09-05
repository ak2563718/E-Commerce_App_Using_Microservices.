import express from 'express';
import { authProxy, cartProxy, orderProxy, productProxy, userProxy } from '../controller/api.Controller.js';
import { createProxyMiddleware } from 'http-proxy-middleware'

const router = express.Router();
router.use('/auth',authProxy)
router.use('/cart',cartProxy)
router.use("/product/products/:id/images",
  createProxyMiddleware({
    target: "http://localhost:6002",
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const match = req.originalUrl.match(
        /\/product\/products\/([^/]+)\/images/
      );
      if (!match) {
        return path;
      }
      const id = match[1];
      return `/api/product/products/${id}/images`;
    },
  })
);
router.use("/product/images/:id",
  createProxyMiddleware({
    target:"http://lcoalhost:6002",
    changeOrigin:true,
     pathRewrite:(path, req)=>{
      const match = req.originalUrl.match(
        /\/product\/images\/([^/]+)/
      );
      if(!match){
        return path;
      }
      const id = match[1];
      return `/api/product/images/${id}`;
  }
  })
)
router.use('/product',productProxy)
router.use('/user',userProxy)
router.use('/order', orderProxy)

export default router;