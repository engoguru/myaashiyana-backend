const mongoose = require('mongoose');

const numcountSchema = new mongoose.Schema({
   icons: {
      type:String,
   },
    number: {
        type:Number,
    },
    content:{
        type:String
    },

}, { timestamps: true });

module.exports = mongoose.model('numcount', numcountSchema);