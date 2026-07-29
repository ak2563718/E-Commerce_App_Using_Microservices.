import express from 'express';
import { createInfo } from '../controllers/user.Controller.js';
const router = express.Router();
router.post('/users',createInfo)
export default router;