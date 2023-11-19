import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import Joi from "joi";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import { sendOtp } from "../utils/sendOtp.js";
import { deleteOTPFunction, verifyOTPFunction } from "../utils/otpFunc.js";

// Generate OTP for password reset
export const generateOTP = async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate({ email });
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send({ message: "User with given email does not exist!" });

    const OTP = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await Otp.create({
      userId: user._id,
      email,
      otp: OTP,
    });

    let name = user.full_name;

    await sendOtp(email, "Reset Password Otp", OTP, name);
    res.status(200).send({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Verify OTP and reset password
export const verifyOTPAndResetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;
    // Verify OTP from the database
    const email = await getEmailFromOTP(otp);
    const isOTPValid = await verifyOTPFunction(email, otp); // Implement this function

    if (!isOTPValid) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    // Reset password for the user with the new password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashPassword;
    user.confirm_password = hashPassword;
    await user.save();

    // Delete OTP after successful password reset
    await deleteOTPFunction(email); // Implement this function

    res
      .status(200)
      .send({ message: "Password reset successful, proceed to login" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
