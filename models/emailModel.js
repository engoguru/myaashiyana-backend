const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    title:{
        type:String
    }
}, {timestamps: true});

module.exports = mongoose.model('Email', emailSchema);







