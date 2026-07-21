import express from 'express';
import { authLogin, authLogout, authRegister, authverifyEmail } from '../controllers/auth.Controller.js';
const router = express.Router();
router.post('/register',authRegister)
router.get('/verify-email',authverifyEmail)
router.post('/login',authLogin)
router.get('/logout',authLogout)
export default router;