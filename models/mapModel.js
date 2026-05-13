const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
    link:{
        type:String
    }
}, {timestamps: true});

module.exports = mongoose.model("Map", mapSchema);