import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: [1000, "Description can not be more than 100 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", ContactSchema);
