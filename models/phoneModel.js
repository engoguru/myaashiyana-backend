const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    title:{
        type:Number
    }
}, {timestamps:true});

module.exports = mongoose.model('Phone', phoneSchema);