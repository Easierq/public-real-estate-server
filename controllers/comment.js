import Comment from "../models/Comment.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(201).send(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return next(createError(404, "No comment with this id"));
    res.status(200).json("Comment has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getCommentsForAgent = async (req, res, next) => {
  try {
    const comments = await Comment.find({ agentId: req.params.agentId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
