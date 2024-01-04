import User from "../models/User.js";
import Token from "../models/Token.js";
import { sendEmail } from "../utils/sendEmail.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// send password link
export const sendPassword = async (req, res, next) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send({ message: "User with given email does not exist!" });
    if (user.fromGoogle)
      return res.status(400).send({
        message:
          "You should sign in with google since you signed up with it, There is no password to reset!",
      });
    let name = user.full_name;
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
    await sendEmail(user.email, "Reset password", url, name);

    res
      .status(201)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// verify password reset link
export const verifyPassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send({ message: "Valid Url" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//  set new password
export const setNewPassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    user.password = hashPassword;
    user.confirm_password = hashPassword;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset is successful" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
