const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema ({
    images:[
        {
            public_id: String,
            url: String
        }
    ],
    heading: {
        type:String,
    },
    content: {
        type:String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
