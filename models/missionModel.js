const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    images:[
        {
            public_id: String,
            url: String
        }
    ],
    content:{
        type:String
    },
}, {timestamps: true});

module.exports = mongoose.model("Mission", missionSchema);