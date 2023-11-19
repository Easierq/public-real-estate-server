import Contact from "../models/Contact.js";
import { createError } from "../error.js";

export const addContact = async (req, res, next) => {
  const newContact = new Contact({ ...req.body, userId: req.user.id });
  try {
    const savedContact = await newContact.save();
    res.status(201).send({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return next(createError(404, "No contact with this id"));
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

// ROUTE WITH HEADERS

export const addContactHeader = async (req, res, next) => {
  const newContact = new Contact({ ...req.body, userId: req.user.id });
  try {
    const savedContact = await newContact.save();
    res.status(201).send({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
};

export const getContactHeader = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return next(createError(404, "No contact with this id"));
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

export const getAllContactsHeader = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};
