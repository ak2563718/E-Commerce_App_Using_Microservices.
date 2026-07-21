import express from 'express';
import { authRegister, authverifyEmail } from '../controllers/auth.Controller.js';
const router = express.Router();
router.post('/register',authRegister)
router.get('/verify-email',authverifyEmail)
export default router;