import express from "express";
import { addNewsletter } from "../controllers/newsletter";
const router = express.Router();

//CREATE NEWSLETTER
router.post("/", addNewsletter);
