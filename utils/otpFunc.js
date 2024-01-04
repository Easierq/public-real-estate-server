import Otp from "../models/Otp.js";
// Generate and Save OTP for a User
// export const saveOTPInDatabase = async (userId, email, OTP) => {
//   try {
//     const otpData = await OTP.create({
//       userId,
//       email,
//       otp: OTP,
//     });
//     return otpData;
//   } catch (error) {
//     throw new Error("Failed to save OTP");
//   }
// };

// Verify OTP for a User
export const verifyOTPFunction = async (email, otp) => {
  try {
    const otpData = await Otp.findOne({ email, otp: otp });
    if (otpData) {
      // Check if OTP is expired or not
      if (otpData.createdAt > new Date()) {
        return false; // OTP expired
      }
      return true; // OTP is valid
    }
    return false; // OTP not found
  } catch (error) {
    throw new Error("Failed to verify OTP");
  }
};

// Delete OTP after successful password reset
export const deleteOTPFunction = async (email) => {
  try {
    await Otp.deleteMany({ email });
  } catch (error) {
    throw new Error("Failed to delete OTP");
  }
};

export const getEmailFromOTP = async (receivedOTP) => {
  try {
    // Find the OTP record in the database based on the received OTP
    const otpData = await Otp.findOne({ otp: receivedOTP });

    if (otpData) {
      // If the OTP record is found, return the associated email
      return otpData.email;
    }

    // If the OTP record is not found or expired, return null
    return null;
  } catch (error) {
    throw new Error("Failed to retrieve email from OTP");
  }
};
