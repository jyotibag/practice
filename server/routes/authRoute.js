import { Router } from "express";
const router = Router();
import {
  access,
  currentUser,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  restrict,
} from "../controllers/authController.js";
import {
  checkAccess,
  mindUrOwnPage,
  protectRoute,
  validateForgotPass,
  validateLogin,
  validateRegister,
  validateResetPass,
} from "../middlewares/authMiddleware.js";

router.post(`/register`, validateRegister, register);
router.post(`/login`, validateLogin, login);
router.get(`/logout`, logout);
router.post(`/forgot-password`, validateForgotPass, forgotPassword);
router.post(`/reset-password`, validateResetPass, resetPassword);
router.get(`/current-user`, protectRoute, currentUser);
router.get(`/restrict/:slug`, mindUrOwnPage, restrict);
router.get(`/access/:path`, checkAccess, access);

export default router;
