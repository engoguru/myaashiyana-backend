const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    title:{
        type:String
    }
}, {timestamps: true});

module.exports = mongoose.model('Address', addressSchema);