const Joi = require("joi");

  listingSchema = Joi.object({
          listing : Joi.object({
            title : Joi.string().required(),
            description: Joi.string().required(),
            price : Joi.number().required().min(0),
            location : Joi.string().required(),
            country : Joi.string().required(),
            image : Joi.object({
                url : Joi.string().required()
            }).optional()
         }).required()
      });
         

    reviewSchema = Joi.object({
        review : Joi.object({
                comment : Joi.string().required(),
                rating : Joi.number().required().min(1).max(5)
        }).required()
       
    });

    module.exports= {listingSchema, reviewSchema};


