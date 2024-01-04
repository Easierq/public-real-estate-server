import express from "express";
import {
  addContact,
  getContact,
  getAllContacts,
  addContactHeader,
  getContactHeader,
  getAllContactsHeader,
} from "../controllers/contact.js";
import {
  verifyToken,
  verifyAdmin,
  verifyHeader,
  verifyHeaderAdmin,
} from "../verifyToken.js";
const router = express.Router();

//ADD CONTACT
router.post("/", verifyToken, addContact);

//GET CONTACT
router.get("/find/:id", verifyAdmin, getContact);

//GET ALL CONTACTS
router.get("/", verifyAdmin, getAllContacts);

// ROUTE WITH HEADERS //

//ADD CONTACT WITH HEADER
router.post("/header", verifyHeader, addContactHeader);

//GET CONTACT WITH HEADER
router.get("/find/header/:id", verifyHeaderAdmin, getContactHeader);

//GET ALL CONTACTS WITH HEADER
router.get("/header", verifyHeaderAdmin, getAllContactsHeader);

export default router;
