import { createError } from "../error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// export const updateUser = async (req, res, next) => {
//   if (req.params.id === req.user.id) {
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       const { password, confirm_password, ...others } = updatedUser;
//       res.status(201).send({ message: "Account updated successfully" });
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return next(createError(403, "You can only update your account!!"));
//   }
// };

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ...req.body,
              password: hash,
              confirm_password: hash,
              fromGoogle: false,
            },
          },
          { new: true }
        );
        const { password, confirm_password, ...others } = updatedUser;
        res.status(201).send({
          message: "Agent Account activated successfully",
          user: others,
        });
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: { ...req.body, fromGoogle: false },
          },
          { new: true }
        );
        const { password, confirm_password, ...others } = updatedUser;
        res
          .status(201)
          .send({ message: "Account updated successfully", user: others });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your account!!"));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ users, count: users.length });
  } catch (err) {
    return next(err);
  }
};

// ROUTE WITH HEADERS

export const updateUserHeader = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              ...req.body,
              password: hash,
              confirm_password: hash,
              fromGoogle: false,
            },
          },
          { new: true }
        );
        const { password, confirm_password, ...others } = updatedUser;
        res
          .status(201)
          .send({
            message: "Agent Account activated successfully",
            user: others,
          });
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: { ...req.body, fromGoogle: false },
          },
          { new: true }
        );
        const { password, confirm_password, ...others } = updatedUser;
        res
          .status(201)
          .send({ message: "Account updated successfully", user: others });
      }
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your account!!"));
  }
};

export const deleteUserHeader = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUserHeader = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsersHeader = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ users, count: users.length });
  } catch (err) {
    return next(err);
  }
};

// export const updateUser = async (req, res, next) => {
//   if (req.params.id === req.user.id) {
//     try {
//       if (req.body.password) {
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
//         await User.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: { ...req.body, password: hash, confirm_password: hash },
//           },
//           { new: true }
//         );
//         res
//           .status(201)
//           .send({ message: "Agent Account activated successfully" });
//       } else {
//         await User.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(201).send({ message: "Account updated successfully" });
//       }
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return next(createError(403, "You can only update your account!!"));
//   }
// };
