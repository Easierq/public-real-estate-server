import express from "express";
import {
  addReport,
  getReport,
  getAllReports,
  addReportHeader,
  getReportHeader,
  getAllReportsHeader,
} from "../controllers/report.js";
import {
  verifyToken,
  verifyAdmin,
  verifyHeader,
  verifyHeaderAdmin,
} from "../verifyToken.js";
const router = express.Router();

//ADD REPORT
router.post("/", verifyToken, addReport);

//GET REPORT
router.get("/find/:id", verifyAdmin, getReport);

//GET ALL REPORTS
router.get("/", verifyAdmin, getAllReports);

// ROUTE WITH HEADERS //

//ADD REPORT WITH HEADER
router.post("/header", verifyHeader, addReportHeader);

//GET REPORT WITH HEADER
router.get("/find/header/:id", verifyHeaderAdmin, getReportHeader);

//GET ALL REPORTS WITH HEADER
router.get("/header", verifyHeaderAdmin, getAllReportsHeader);

export default router;
