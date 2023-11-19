import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import listingRoutes from "./routes/listings.js";
import commentRoutes from "./routes/comments.js";
import contactRoutes from "./routes/contacts.js";
import feedbackRoutes from "./routes/feedbacks.js";
import reportRoutes from "./routes/reports.js";
import passwordResetRoutes from "./routes/passwordReset.js";
import NewsletterRoutes from "./routes/newsletter.js";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

//Third party middlewares
app.use(
  cors({
    origin: [
      "https://kwita-test.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// app.get("/", (req, res) => res.send("root endpoint"));
// Middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/newsletter", NewsletterRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  connect();
  console.log("Connected to Server");
});
