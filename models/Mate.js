import mongoose from "mongoose";

const MateSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    desc: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: [150, "Description can not be more than 100 characters"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Please provide phoneNo"],
    },
    whatsAppNo: {
      type: Number,
      required: [true, "Please provide whatsAppNo"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mate", MateSchema);
