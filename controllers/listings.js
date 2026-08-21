const Listing = require("../models/listing.js");

module.exports.index = async(req,res)=> { 
      const allListings  = await Listing.find();
      res.render("listings/listing.ejs", {allListings});
};

module.exports.createNew = (req,res)=> {
        console.log(req.user); 
    res.render("listings/new.ejs")};

module.exports.renderNewForm = (req, res)=> {
    res.render("listings/new.ejs");
}

module.exports.createNewListing = (async(req,res)=> {
        console.log(req.body);
        // console.log("post route hitt!");
            //  if(!req.body.listing){
            //     throw new expressError(400, "send valid data for listing");
            //  }

          let url = req.file.path;
          let filename = req.file.filename;
          let {title, description, image, price, location, country} = req.body.listing;
          console.log("hello");
        //   console.log(title);
            let newListing = await  new Listing(req.body.listing);
               newListing.owner = req.user._id;
               newListing.image = {url, filename};
               await newListing.save().then((res)=> {console.log(res)});  
               req.flash("success", "new listing is created!!!");
               res.redirect("/listings");       
});

module.exports.showListing =  async(req,res)=>{
            let {id}   =   req.params;
            // console.log(id);
            let data = await Listing.findById(id).populate({path: "reviews",
              populate : {
                path : "author",
            },
            })
            .populate("owner");
            if(!data) {
                req.flash("error", "Listing you requested for does not exists!");
               return res.redirect("/listings"); 
            }
            console.log(data);
            res.render("listings/show.ejs", {data})};

    module.exports.renderEditForm = async (req, res)=> {
            let {id} = req.params;
            let data = await Listing.findById(id);
            if(!data){
                req.flash("error", "Listing you requested for does not exists!");
                res.redirect("/listings");
            }

            let originalImageUrl = data.image.url;
           originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
            res.render("listings/edit.ejs", {data, originalImageUrl});
    }

     module.exports.updateListing =  async(req,res)=> {
                     let {id} = req.params;
                   let listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});
                   
        //these lines to insert our edited image into our edited listing , that we'll save....
                  if(typeof req.file !== "undefined") {
                  let url = req.file.path;
                  let filename = req.file.filename;
                  listing.image = {url, filename};
                  await listing.save();  
                  }
                   req.flash("success", "Listing Updated!!");
                   res.redirect(`/listings/${id}`);    
     }
      module.exports.editListing = async(req,res)=> {
                      let {id} = req.params;
                      let  editedData = req.body.listing;
                      console.log(editedData);  
                     await Listing.findByIdAndUpdate(id, editedData, {runValidators: true, new: true});
                      res.redirect(`/listings/${id}`)};    
                      
      module.exports.destroyListing = async(req,res)=> {
                    let {id}= req.params;
                    await Listing.findByIdAndDelete(id).then((res)=> console.log(res));
                    req.flash("success", "Lisiting is Deleted !");
                    res.redirect("/listings")};                