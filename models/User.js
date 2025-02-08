import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 6,
    },
    confirm_password: {
      type: String,
      required: false,
      minlength: 6,
    },
    full_name: {
      type: String,
      required: true,
      maxlength: 30,
      minlength: 4,
    },
    agency_name: {
      type: String,
      required: false,
      maxlength: 30,
      minlength: 4,
    },
    address: {
      type: String,
      maxlength: 50,
    },
    phone_number: {
      type: String,
      required: false,
      maxlength: 15,
      // minlength: 4,
    },
    whatsapp_number: {
      type: String,
      required: false,
      maxlength: 15,
      // minlength: 11,
    },
    picture: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAgent: {
      type: Boolean,
      default: false,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
