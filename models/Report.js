import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    homeId: {
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
      maxlength: [500, "Description can not be more than 100 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
