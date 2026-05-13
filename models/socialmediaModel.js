const mongoose = require('mongoose');

const socialmediaLinkSchema = new mongoose.Schema({
    facebook:{
        type:String
    },
    instagram:{
        type:String
    },
    youtube:{
        type:String
    },
    twitter:{
        type:String
    }
}, {timestamps:true});

module.exports = mongoose.model("SocialmediaLinks", socialmediaLinkSchema);