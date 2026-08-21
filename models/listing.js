const  mongoose= require("mongoose");
const Review = require("./reviews.js");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
       filename: {
        type: String,
       default: "listingimage"
    },
       url : {
        type: String,
       }
    },
    price: {
        type : Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
      

    
});


listingSchema.post("findOneAndDelete", async(listing)=> {
            console.log("middleware renn");
            console.log(listing);
            if(listing){
                await Review.deleteMany({_id : {$in : listing.reviews}});
            }
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports  = Listing;