import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.userId = payload.id;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.userId = user.id;
    if (req.user.isAdmin) {
      next();
    } else {
      return next(
        createError(403, "Only Admin is allowed to perform this operation!")
      );
    }
  });
};

// USING HEADERS

export const verifyHeader = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(createError(401, "You are not authenticated!"));
  const token = authHeader.split(" ")[1];
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token not valid"));
    req.user = user;
    next();
  });
};

export const verifyHeaderAdmin = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(createError(401, "You are not authenticated!"));
  const token = authHeader.split(" ")[1];
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    if (req.user.isAdmin) {
      next();
    } else {
      return next(
        createError(403, "Only Admin is allowed to perform this operation!")
      );
    }
  });
};
