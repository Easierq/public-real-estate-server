import Listing from "../models/Listing.js";
import { createError } from "../error.js";

export const addListing = async (req, res, next) => {
  if (!req.user.isAgent)
    return next(createError(403, "Only agents can post a property!"));

  const newListing = new Listing({ ...req.body, userId: req.user.id });
  try {
    const savedListing = await newListing.save();
    res.status(201).send({ message: "Property posted sucessfully" });
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, "No property with this id"));
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, "No property with this id"));
    if (req.user.id === listing.userId || req.user.isAdmin) {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "This property has been deleted." });
    } else {
      return next(createError(403, "You can delete only your property"));
    }
  } catch (err) {
    next(err);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, "No property with this id"));
    if (req.user.id === listing.userId) {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send({ message: "Property updated successfully" });
    } else {
      return next(createError(403, "You can update only your own property"));
    }
  } catch (err) {
    next(err);
  }
};

export const randomListings = async (req, res, next) => {
  try {
    const listings = await Listing.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const getListingsForAgent = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userId: req.params.agentId });
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({});
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const searchListings = async (req, res, next) => {
  const query = req.query.q;
  const filter = {};

  if (query) {
    const searchTerms = query.split(" ");
    filter.$or = [];
    searchTerms.forEach((term) => {
      filter.$or.push(
        { title: { $regex: `.*${term}.*`, $options: "i" } },
        { description: { $regex: `.*${term}.*`, $options: "i" } },
        { location: { $regex: `.*${term}.*`, $options: "i" } }
      );
    });
  }

  try {
    const listings = await Listing.find(filter).limit(20);
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const filterListings = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.category && { category: q.category }),
    ...(q.type && { type: q.type }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
  };

  if (q.search) {
    const searchTerms = q.search.split(" ");
    filters.$or = [];
    searchTerms.forEach((term) => {
      filters.$or.push(
        { title: { $regex: `.*${term}.*`, $options: "i" } },
        { description: { $regex: `.*${term}.*`, $options: "i" } },
        { location: { $regex: `.*${term}.*`, $options: "i" } }
      );
    });
    // filters.$text = { $search: q.search };
    // filters.$text.$caseSensitive = false;
    // filters.$text.$diacriticSensitive = false;
  }

  try {
    const listings = await Listing.find(filters);
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const getFeaturedListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ isFeatured: true });
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const getPopularListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ isPopular: true });
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

// ROUTE WITH HEADERS

export const addListingHeader = async (req, res, next) => {
  if (!req.user.isAgent)
    return next(createError(403, "Only agents can post a property!"));

  const newListing = new Listing({ ...req.body, userId: req.user.id });
  try {
    const savedListing = await newListing.save();
    res.status(201).send({ message: "Property posted sucessfully" });
  } catch (err) {
    next(err);
  }
};

export const deleteListingHeader = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, "No property with this id"));
    if (req.user.id === listing.userId || req.user.isAdmin) {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "This property has been deleted." });
    } else {
      return next(createError(403, "You can delete only your property"));
    }
  } catch (err) {
    next(err);
  }
};

export const updateListingHeader = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(createError(404, "No property with this id"));
    if (req.user.id === listing.userId) {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send({ message: "Property updated successfully" });
    } else {
      return next(createError(403, "You can update only your own property"));
    }
  } catch (err) {
    next(err);
  }
};

// CONTROLLER WITH PAGINATION

// export const getAllListings = async (req, res, next) => {
//   try {
//     const PAGE_SIZE = 5;
//     const page = parseInt(req.query.page || 0);
//     const total = await Listing.countDocuments({});
//     const listings = await Listing.find({})
//       .skip(PAGE_SIZE * page)
//       .limit(PAGE_SIZE);
//     res
//       .status(200)
//       .json({ totalPages: Math.ceil(total / PAGE_SIZE), total, listings });
//   } catch (err) {
//     next(err);
//   }
// };
