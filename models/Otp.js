import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Set an expiration time for OTP (in seconds) - e.g., 10 minutes
  },
});

export default mongoose.model("Otp", OtpSchema);
