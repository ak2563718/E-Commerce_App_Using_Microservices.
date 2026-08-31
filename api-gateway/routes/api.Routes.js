import express from 'express';
import { authProxy, cartProxy, productProxy, userProxy } from '../controller/api.Controller.js';

const router = express.Router();
router.use('/auth',authProxy)
router.use('/cart',cartProxy)
router.use('/product',productProxy)
router.use('/user',userProxy)

export default router;