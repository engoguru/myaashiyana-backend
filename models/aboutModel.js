const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    images:[
        {
            public_id: String,
            url: String
        }
    ],
    content:{
        type:String
    },
}, {timestamps: true})

module.exports = mongoose.model("About", aboutSchema);