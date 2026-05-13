const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    heading: {
        type: String,
    },

    video: {
        type: String,
        default: "",
    },

}, { timestamps: true });

module.exports = mongoose.model('gallery', gallerySchema);