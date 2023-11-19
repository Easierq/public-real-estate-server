import express from "express";
import { generateOTP, verifyOTPAndResetPassword } from "../controllers/otp.js";
const router = express.Router();

//GENERATE TOKEN
router.post("/generate-otp", generateOTP);

//VERIFY OTP
router.post("/verify-otp-reset-password", verifyOTPAndResetPassword);

export default router;
