import express from "express";
import {
  addFeedback,
  getFeedback,
  getAllFeedbacks,
  addFeedbackHeader,
  getFeedbackHeader,
  getAllFeedbacksHeader,
} from "../controllers/feedback.js";
import {
  verifyToken,
  verifyAdmin,
  verifyHeader,
  verifyHeaderAdmin,
} from "../verifyToken.js";
const router = express.Router();

//ADD FEEDBACK
router.post("/", verifyToken, addFeedback);

//GET FEEDBACK
router.get("/find/:id", verifyAdmin, getFeedback);

//GET ALL FEEDBACKS
router.get("/", verifyAdmin, getAllFeedbacks);

// ROUTE WITH HEADERS //

//ADD FEEDBACK WITH HEADER
router.post("/header", verifyHeader, addFeedbackHeader);

//GET FEEDBACK WITH HEADER
router.get("/find/header/:id", verifyHeaderAdmin, getFeedbackHeader);

//GET ALL FEEDBACKS WITH HEADER
router.get("/header", verifyHeaderAdmin, getAllFeedbacksHeader);

export default router;
