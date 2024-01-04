import express from "express";
import {
  addListing,
  getListing,
  deleteListing,
  updateListing,
  randomListings,
  getListingsForAgent,
  getAllListings,
  searchListings,
  filterListings,
  getFeaturedListings,
  getPopularListings,
  addListingHeader,
  deleteListingHeader,
  updateListingHeader,
  //   trendListings,
  //   countByCity,
  //   countByType,
} from "../controllers/listing.js";
import { verifyToken, verifyHeader } from "../verifyToken.js";
const router = express.Router();

//ADD LISTING
router.post("/", verifyToken, addListing);

//GET LISTING
router.get("/find/:id", getListing);

//DELETE LISTING
router.delete("/:id", verifyToken, deleteListing);

//UPDATE LISTING
router.put("/:id", verifyToken, updateListing);

//GET RANDOM LISTINGS
router.get("/random", randomListings);

//GET AGENT LISTINGS
router.get("/finder/:agentId", getListingsForAgent);

//GET ALL LISTINGS
router.get("/", getAllListings);

// GET SEARCH LISTINGS
router.get("/search", searchListings);

// GET FILTER LISTINGS
router.get("/filter", filterListings);

// GET FEATURED LISTINGS
router.get("/featured", getFeaturedListings);

// GET POPULAR LISTINGS
router.get("/popular", getPopularListings);

// ROUTE WITH HEADERS //

//ADD LISTING WITH HEADER
router.post("/header", verifyHeader, addListingHeader);

//DELETE LISTING WITH HEADER
router.delete("/header/:id", verifyHeader, deleteListingHeader);

//UPDATE LISTING HEADER
router.put("/header/:id", verifyHeader, updateListingHeader);

export default router;
// FUTURE UPDATES

// //GET TRENDING LISTINGS
// router.get("/trend", trendListings);

// //COUNT BY CITY
// router.get("/countByCity", countByCity);

// //COUNT BY TYPE
// router.get("/countByType", countByCity);
