import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
