import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema(
  {
    subscriberEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Newsletter", NewsletterSchema);
