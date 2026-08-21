const  mongoose= require("mongoose");
const { default: passportLocalMongoose } = require("passport-local-mongoose");
const passortLocalMongoose = require("passport-local-mongoose");

//user schema..

const userSchema = new mongoose.Schema({
    email : {
            type : String,
            required : true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

