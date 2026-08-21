if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
// console.log(process.env);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");


const path = require("path");
const method_Override = require("method-override");
const ejsMate = require("ejs-mate");
let expressError = require("./utils/expressError.js");
const session = require("express-session");
const {MongoStore} = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
   
 
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

let DB_URL = process.env.ATLAS_DB;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(method_Override("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
//session management..

const store = MongoStore.create({
    mongoUrl : DB_URL,
    crypto : {
        secret : process.env.SESSION_SECRET
    },
    touchAfter : 24 *3600,
});

store.on("error", ()=> {
        console.log("Error in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store : store,
    secret : process.env.SECRET,
    resave : false,
    saveUnintialized : true,
    cookie : {
        expires : Date.now() + 1000 * 60 * 60 * 24 * 3,
        secret : "process.env.SECRET",
                maxAge : 1000 * 60 * 60 * 24 * 3,
                httpOnly : true
        }
};

//mongo db connection establishing!!!

async function main() {
        await mongoose.connect("mongodb+srv://amanrathore4943_db_user:q0AQu3KG1urMVXAC@cluster0.u4zj6ig.mongodb.net/?appName=Cluster0");
    }; 

main().then((res)=> {
    console.log("connection succesful!!!"); 
   
}).catch((err)=> {
    console.log("Mongo Fail")
    console.log(err);
});

 

// a middleware for sessionss..

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//session and flash!!
    app.use((req, res, next)=> {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(res.locals.success);
    next();
    });


app.listen(8080,()=> {
        console.log("server is running");
    });

    
        //passport
        app.get("/demouser", async(req,res)=> {
            let fakeUser = new User({
                email : "amanrathore4943@gmail.com",
                username : "amanSinghRathore"
            });
              const registeredUser =  await User.register(fakeUser, "helloworld!!");
              res.send(registeredUser);
    }) 
    app.use("/listings", listingsRouter); 
    app.use("/listings/:id/reviews", reviewsRouter);
    app.use("/", userRouter);



//middleware
app.use((req, res, next)=> {
    console.log(req.method, req.originalUrl);
    next(new expressError(404, "Page Not Found!!!"));
});




//Error handling middleware.....
app.use((err, req, res, next)=> {
        let{status=500, message="Some Error occured"} = err;
        res.status(status).render("error.ejs", {err});
        console.log(err.stack);
});


































// app.get("/testListing", async(req,res)=>{
//             const sampleListing = await new Listing({
//                 title: "My villa",
//                 description: "very beautiful villa",
//                 image: "",
//                 price: 7500,
//                 location:"Mahesh nagar",
//                 country: "India"
//             });
//             await sampleListing.save().then((res)=> {console.log(res)});
//             res.send("succesful!!");
//        });