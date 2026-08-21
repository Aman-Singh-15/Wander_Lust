const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then((res)=> {
    console.log("connected to DB");
   
}).catch((err)=> {
    console.log(err); 
});

async function main() {
        await mongoose.connect("mongodb://127.0.0.1:27017/pro");
    };

    let initDb = async()=> {
       await Listing.deleteMany({});
      initData.data = initData.data.map((obj)=> ({...obj, owner: "6a78c66d3f9e0814268fd0fa"}));
       await Listing.insertMany(initData.data);
       console.log("data was initialized"); 
    };

    initDb();
    
    

