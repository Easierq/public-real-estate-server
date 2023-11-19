import Newsletter from "../models/Newsletter.js";

export const addNewsletter = async (req, res, next) => {
  const newNewsletter = new Newsletter(req.body);
  try {
    const savedNewsletter = await newNewsletter.save();
    res.status(200).send(savedNewsletter);
  } catch (err) {
    next(err);
  }
};
