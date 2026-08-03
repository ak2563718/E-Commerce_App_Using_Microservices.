import express from 'express';
import { auth_CheckSession, auth_forgotPassword, auth_refresh_AccessToken, auth_resetPassword, authLogin, authLogout, authRegister, authverifyEmail, createRole, sellerSignup } from '../controllers/auth.Controller.js';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';
import { loginLimiter, singupLimiter } from '../config/rateLimiting.js';
const router = express.Router();
// user routes
router.post('/register',singupLimiter,authRegister)
router.post('/seller-register',authMiddleware,sellerSignup)
router.get('/verify-email',authverifyEmail)
router.post('/login',loginLimiter,authLogin)
router.get('/logout',authLogout)
router.get('/refresh-token',auth_refresh_AccessToken)
router.get('/check-session',auth_CheckSession)
router.post('/forgot-password',auth_forgotPassword)
router.patch('/reset-password',auth_resetPassword)

// role create routes
router.post('/createrole',adminMiddleware,createRole)
export default router;