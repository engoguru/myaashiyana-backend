const mongoose = require("mongoose");

const programeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    species: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        default: 'Unknown',
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    rescueStory: {
        type: String,
        required: true,
        maxlength: 1000
    },
    medicalCondition: {
        type: String,
        default: 'None'
    },
    monthlyCareCost: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Available', 'Sponsored'],
        default: 'Available'
    },
    images: [
        {
            public_id: { type: String },
            url: { type: String }
        }
    ],
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Programe', programeSchema);
