import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsForAgent,
  getAllComments,
} from "../controllers/comment.js";
import { verifyToken, verifyAdmin } from "../verifyToken.js";
const router = express.Router();

//ADD COMMENTS
router.post("/", verifyToken, addComment);

//DELETE COMMENTS
router.delete("/:id", verifyAdmin, deleteComment);

//GET COMMENTS FOR AGENT
router.get("/:agentId", getCommentsForAgent);

//GET ALL COMMENTS
router.get("/", verifyAdmin, getAllComments);

export default router;
