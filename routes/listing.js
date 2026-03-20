const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// router
//   .route("/")
//   .get(wrapAsync(listingController.index))
//   .post(
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
//   );

// router.put(
//   "/:id",
//   upload.single("image"),
//   wrapAsync(async (req, res) => {
//     const listing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body.listing
//     );

//     if (req.file) {
//       listing.image = {
//         url: req.file.path,
//         filename: req.file.filename,
//       };
//       await listing.save();
//     }

//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${listing._id}`);
//   })
// );

// //New Route
// router.get("/new", isLoggedIn, listingController.renderNewForm);

// router
//   .route("/:id")
//   .get(wrapAsync(listingController.showListing))
//   .put(
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing)
//   )
//   .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Index Route
// router.get("/", wrapAsync(listingController.index));

//Show Route
// router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(listingController.createListing)
// );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );

// //Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// );

module.exports = router;
