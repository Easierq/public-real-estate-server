import Report from "../models/Report.js";
import { createError } from "../error.js";

export const addReport = async (req, res, next) => {
  const newReport = new Report({ ...req.body, userId: req.user.id });
  try {
    const savedReport = await newReport.save();
    res.status(201).send({ message: "Report sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return next(createError(404, "No report with this id"));
    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

export const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

// ROUTE WITH HEADERS

export const addReportHeader = async (req, res, next) => {
  const newReport = new Report({ ...req.body, userId: req.user.id });
  try {
    const savedReport = await newReport.save();
    res.status(201).send({ message: "Report sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const getReportHeader = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return next(createError(404, "No report with this id"));
    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

export const getAllReportsHeader = async (req, res, next) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};
