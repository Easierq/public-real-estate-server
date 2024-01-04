import Feedback from "../models/Feedback.js";
import { createError } from "../error.js";

export const addFeedback = async (req, res, next) => {
  const newFeedback = new Feedback({ ...req.body, userId: req.user.id });
  try {
    const savedFeedback = await newFeedback.save();
    res.status(201).send({ message: "Feedback sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return next(createError(404, "No feedback with this id"));
    res.status(200).json(feedback);
  } catch (err) {
    next(err);
  }
};

export const getAllFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({});
    res.status(200).json(feedbacks);
  } catch (err) {
    next(err);
  }
};

// ROUTE WITH HEADERS

export const addFeedbackHeader = async (req, res, next) => {
  const newFeedback = new Feedback({ ...req.body, userId: req.user.id });
  try {
    const savedFeedback = await newFeedback.save();
    res.status(201).send({ message: "Feedback sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const getFeedbackHeader = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return next(createError(404, "No feedback with this id"));
    res.status(200).json(feedback);
  } catch (err) {
    next(err);
  }
};

export const getAllFeedbacksHeader = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({});
    res.status(200).json(feedbacks);
  } catch (err) {
    next(err);
  }
};
