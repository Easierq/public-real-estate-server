import Mate from "../models/Mate.js";
import { createError } from "../error.js";

export const addMate = async (req, res, next) => {
  const newMate = new Mate({ ...req.body, userId: req.user.id });
  try {
    const savedMate = await newMate.save();
    res.status(200).send(savedMate);
  } catch (err) {
    next(err);
  }
};

export const getMate = async (req, res, next) => {
  try {
    const mate = await Mate.findById(req.params.id);
    res.status(200).json(mate);
  } catch (err) {
    next(err);
  }
};

export const deleteMate = async (req, res, next) => {
  try {
    const mate = await Mate.findById(req.params.id);
    if (!mate) return next(createError(401, "No Mate with this id"));
    if (req.user.id === mate.userId || req.user.isAdmin) {
      await Mate.findByIdAndDelete(req.params.id);
      res.status(200).json("The mate has been deleted.");
    } else {
      return next(createError(403, "You are not allowed to delete this mate"));
    }
  } catch (err) {
    next(err);
  }
};

export const getUserMates = async (req, res, next) => {
  try {
    const mates = await Mate.find({ userId: req.params.userId });
    res.status(200).json(mates);
  } catch (err) {
    next(err);
  }
};

export const getAllMates = async (req, res, next) => {
  try {
    const mates = await Mate.find({});
    res.status(200).json(mates);
  } catch (err) {
    next(err);
  }
};
