const express= require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
let wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateSchema} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



const listingController = require("../controllers/listings.js");

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"), validateSchema, wrapAsync(listingController.createNewListing));


//new route..
router.get("/new", isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner, upload.single("listing[image]"), validateSchema, wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));

 
//edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));

  

module.exports = router;