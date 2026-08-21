const express= require("express");
const router = express.Router({mergeParams: true});
let wrapAsync = require("../utils/wrapAsync.js");   
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const  reviewController = require("../controllers/reviews.js"); 
//Review...
//POST ROUTE.....

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//DELETE Route...

router.delete("/:reviewId", isLoggedIn, isReviewAuthor,  wrapAsync(reviewController.destroyReview));

module.exports = router;