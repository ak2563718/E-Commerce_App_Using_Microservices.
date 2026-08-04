import express from 'express';
import { createAddress, createInfo, deleteaddress, getaddressbyId, getAddresswithUserId, getUser, updateaddress, updatedefaultsetting, updateUser } from '../controllers/user.Controller.js';
import { authMiddleware } from '../middlewares/auth.Middleware.js';
const router = express.Router();
// 1. user information
router.post('/users',createInfo)
router.get('/users/me',authMiddleware,getUser)
router.patch('/users/me',authMiddleware,updateUser)

// 2. address information
router.post('/address',authMiddleware,createAddress)
router.get('/address',authMiddleware,getAddresswithUserId)
router.get('/address/:id',getaddressbyId)
router.patch('/address/:id',updateaddress)
router.delete('/address/:id',deleteaddress)
router.patch('/address/:id/default',updatedefaultsetting)
export default router;