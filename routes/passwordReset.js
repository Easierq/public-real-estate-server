import express from "express";
import {
  sendPassword,
  verifyPassword,
  setNewPassword,
} from "../controllers/passwordReset.js";

const router = express.Router();

//SEND PASSWORD LINK
router.post("/", sendPassword);

//VERIFY PASSWORD RESET LINK
router.get("/:id/:token", verifyPassword);

//SET NEW PASSWORD
router.post("/:id/:token", setNewPassword);

export default router;
