const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({

    images:[
        {
            public_id: String,
            url: String
        }
    ],
    name: {
        type:String,
    },
    comment:{
        type:String
    },
   
}, { timestamps: true });

module.exports = mongoose.model('testimonials', testimonialsSchema);