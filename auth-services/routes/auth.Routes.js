import express from 'express';
import { auth_CheckSession, auth_forgotPassword, auth_refresh_AccessToken, auth_resetPassword, authLogin, authLogout, authRegister, authverifyEmail } from '../controllers/auth.Controller.js';
const router = express.Router();
router.post('/register',authRegister)
router.get('/verify-email',authverifyEmail)
router.post('/login',authLogin)
router.get('/logout',authLogout)
router.post('/refreshtoken',auth_refresh_AccessToken)
router.get('/check-session',auth_CheckSession)
router.post('/forgot-password',auth_forgotPassword)
router.patch('/reset-password',auth_resetPassword)
export default router;