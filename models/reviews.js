const  mongoose= require("mongoose");
const Listing = require("./listing.js");

const reviewSchema = new mongoose.Schema({
        comment : {
            type : String
        },
        rating : {
            type : Number,
            min : 1,
            max : 5
        },
        createdAt : {
            type : Date,
            default : Date.now()
        },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "User"
        }
});



reviewSchema.post("findByIdAndDelete", async(review)=>{
    if(review){
        await Listing.updateMany(
            {reviews : review._id},
            {$pull : {reviews: review._id}}
        );
    }
});
      
module.exports = mongoose.model("Review", reviewSchema);