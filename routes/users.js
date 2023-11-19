import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  updateUserHeader,
  deleteUserHeader,
  getUserHeader,
  getAllUsersHeader,
} from "../controllers/user.js";
import {
  verifyToken,
  verifyAdmin,
  verifyHeader,
  verifyHeaderAdmin,
} from "../verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyToken, updateUser);

//DELETE USER
router.delete("/:id", verifyAdmin, deleteUser);

//GET A USER
router.get("/find/:id", getUser);

// GET ALL USERS
router.get("/", verifyAdmin, getAllUsers);

// ROUTE WITH HEADERS //

//UPDATE USER WITH HEADER
router.put("/header/:id", verifyHeader, updateUserHeader);

//DELETE USER WITH HEADER
router.delete("/header/:id", verifyHeaderAdmin, deleteUserHeader);

//GET A USER WITH HEADER
router.get("/find/header/:id", getUserHeader);

// GET ALL USERS WITH HEADER
router.get("/header", verifyHeaderAdmin, getAllUsersHeader);

export default router;
