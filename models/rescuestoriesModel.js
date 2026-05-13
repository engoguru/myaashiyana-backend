const mongoose = require("mongoose");

const rescueStorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            public_id: { type: String },
            url: { type: String }
        }
    ],
    journey: {
        type: [String],
        required: true,
    },
    video: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("RescueStory", rescueStorySchema);
