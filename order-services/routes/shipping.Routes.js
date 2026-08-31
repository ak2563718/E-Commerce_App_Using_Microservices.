import express from 'express';
import { createShippingAddress, deleteShippingAddress, getShippingAddress, updateAddress } from '../controller/shipping.Controller.js';
import { authMiddleware } from '../middleware/auth.Middleware.js';

const router = express.Router();
router.post('/order/address',authMiddleware,createShippingAddress)
router.get('/order/address',authMiddleware,getShippingAddress)
router.patch('/order/address/:id',authMiddleware,updateAddress)
router.delete('/order/address/:id',authMiddleware,deleteShippingAddress)

export default router;