import express from 'express';
import { authRegister } from '../controllers/auth.Controller.js';
const router = express.Router();
router.post('/register',authRegister)

export default router;