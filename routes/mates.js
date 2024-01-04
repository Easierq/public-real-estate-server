import express from "express";
import {
  addMate,
  deleteMate,
  getMate,
  getUserMates,
  getAllMates,
} from "../controllers/mate.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//CREATE MATE
router.post("/", verifyToken, addMate);

//GET MATE
router.get("/:id", getMate);

//DELETE MATE
router.delete("/:id", verifyToken, deleteMate);

//GET USER MATES
router.get("/find/:userId", getUserMates);

//GET ALL MATES
router.get("/", getAllMates);

export default router;
