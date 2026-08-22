require("dotenv").config();
const mongoose = require("mongoose");

const Listing = require("./models/listing");
const User = require("./models/user");
const { data } = require("./init/data");

async function seed() {
    await mongoose.connect(process.env.ATLAS_DB);

    const currentUser = await User.findOne({
        username: "Aman Singh Rathore"
    });

    if (!currentUser) {
        throw new Error("Aman Singh Rathore not found");
    }

    const listings = data.map((listing) => ({
        ...listing,
        owner: currentUser._id
    }));

    await Listing.insertMany(listings);

    console.log("Listings imported successfully!");

    await mongoose.connection.close();
}

seed();