import express from "express";
import { addNewsletter } from "../controllers/newsletter.js";
const router = express.Router();

//CREATE NEWSLETTER
router.post("/", addNewsletter);

export default router;
