import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import Joi from "joi";

export const signup = async (req, res, next) => {
  const { email, phone_number, agency_name } = req.body;
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });

    const { error } = emailSchema.validate({ email });
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists)
      return res
        .status(400)
        .send({ message: "User with this email already Exist!" });

    const agencyAlreadyExists = await User.findOne({ agency_name });
    if (agencyAlreadyExists)
      return res.status(400).send({
        message:
          "User with this agency name already exist, Please choose another agency name!",
      });

    const phoneAlreadyExists = await User.findOne({ phone_number });
    if (phoneAlreadyExists)
      return res
        .status(400)
        .send({ message: "User with this phone number already exist!" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
      confirm_password: hash,
      isAgent: true,
    });

    await newUser.save();
    const { password, confirm_password, ...others } = newUser._doc;
    res.status(201).send({ message: "Account created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Invalid Credentials"));
    if (user.fromGoogle)
      return next(
        createError(
          404,
          "You should sign in with google since you signed up with it"
        )
      );

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isAgent: user.isAgent },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const { password, confirm_password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        user: others,
        message: "Login successfully",
      });
  } catch (err) {
    next(err);
  }
};

export const signout = async (req, res) => {
  res.cookie("access_token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).send("User logged out!");
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // SIGN IN
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAgent: user.isAgent },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send({ user: user._doc });
    } else {
      // REGISTER
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        { id: savedUser._id, isAgent: savedUser.isAgent },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send({ user: savedUser._doc });
    }
  } catch (err) {
    next(err);
  }
};

// AUTH WITH HEADERS

export const signupHeader = async (req, res, next) => {
  const { email, phone_number, agency_name } = req.body;
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });

    const { error } = emailSchema.validate({ email });
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists)
      return res
        .status(400)
        .send({ message: "User with this email already Exist!" });

    const agencyAlreadyExists = await User.findOne({ agency_name });
    if (agencyAlreadyExists)
      return res.status(400).send({
        message:
          "User with this agency name already exist, Please choose another agency name!",
      });

    const phoneAlreadyExists = await User.findOne({ phone_number });
    if (phoneAlreadyExists)
      return res
        .status(400)
        .send({ message: "User with this phone number already exist!" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
      confirm_password: hash,
      isAgent: true,
    });

    await newUser.save();
    const { password, confirm_password, ...others } = newUser._doc;
    res.status(201).send({ message: "Account created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signinHeader = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Invalid Credentials"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isAgent: user.isAgent },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const { password, confirm_password, ...others } = user._doc;

    res.status(200).send({
      user: others,
      message: "Login successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const googleAuthHeader = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // SIGN IN
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAgent: user.isAgent },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res.status(200).send({ user: user._doc, token });
    } else {
      // REGISTER
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        { id: savedUser._id, isAgent: savedUser.isAgent },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      res.status(200).send({ user: savedUser._doc, token });
    }
  } catch (err) {
    next(err);
  }
};
