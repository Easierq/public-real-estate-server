import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, "Description can not be more than 200 characters"],
    },
    location: {
      type: String,
      required: true,
      maxlength: [100, "Address can not be more than 100 characters"],
    },
    type: {
      type: String,
      enum: [
        "Self contain",
        "Flat",
        "Single room",
        "Office",
        "Land",
        "Building",
        "Shop",
      ],
      default: "Self contain",
      required: true,
    },
    category: {
      type: String,
      enum: ["For sale", "For lease", "For rent"],
      default: "For rent",
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    bathroom: {
      type: Number,
      required: false,
      default: 0,
    },
    bedroom: {
      type: Number,
      required: false,
      default: 0,
    },
    parlour: {
      type: Number,
      required: false,
      default: 0,
    },
    kitchen: {
      type: Number,
      required: false,
      default: 0,
    },
    plot: {
      type: Number,
      required: false,
      default: 0,
    },
    dimension: {
      type: String,
      required: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    videoUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

ListingSchema.index({ title: "text", description: "text", location: "text" });

export default mongoose.model("Listing", ListingSchema);
