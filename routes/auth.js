import express from "express";
import {
  googleAuth,
  signup,
  signin,
  signout,
  googleAuthHeader,
  signinHeader,
  signupHeader,
} from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

// SIGN IN
router.post("/signin", signin);

// SIGN OUT
router.get("/signout", signout);

//GOOGLE AUTH
router.post("/google", googleAuth);

// ROUTE WITH HEADERS //

//CREATE A USER WITH HEADER
router.post("/signup/header", signupHeader);

// SIGN IN WITH HEADER
router.post("/signin/header", signinHeader);

//GOOGLE AUTH WITH HEADER
router.post("/google/header", googleAuthHeader);

export default router;
