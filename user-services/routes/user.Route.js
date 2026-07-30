import express from 'express';
import { createAddress, createInfo, deleteaddress, getaddressbyId, getAddresswithUserId, getUser, updateaddress, updatedefaultsetting, updateUser } from '../controllers/user.Controller.js';
const router = express.Router();
// 1. user information
router.post('/users',createInfo)
router.get('/users/me',getUser)
router.patch('/users/me',updateUser)

// 2. address information
router.post('/address',createAddress)
router.get('/address',getAddresswithUserId)
router.get('/address/:id',getaddressbyId)
router.patch('/address/:id',updateaddress)
router.delete('/address/:id',deleteaddress)
router.patch('/address/:id/default',updatedefaultsetting)
export default router;