import express from 'express';
import { auth_CheckSession, auth_forgotPassword, auth_refresh_AccessToken, auth_resetPassword, authLogin, authLogout, authRegister, authverifyEmail, sellerSignup } from '../controllers/auth.Controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/register',authRegister)
router.post('/seller-register',authMiddleware,sellerSignup)
router.get('/verify-email',authverifyEmail)
router.post('/login',authLogin)
router.get('/logout',authLogout)
router.post('/refreshtoken',auth_refresh_AccessToken)
router.get('/check-session',auth_CheckSession)
router.post('/forgot-password',auth_forgotPassword)
router.patch('/reset-password',auth_resetPassword)
export default router;