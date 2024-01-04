import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    agentId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      maxlength: [200, "Comment can not be more than 200 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
