const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    heading: {
        type: String,
        trim: true
    },
    excerpt: {
        type: String,
        trim: true,
        maxlength: 500
    },
    content: {
        type: String,
        required: true
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
    author: {
        type: String,
        default: 'Admin'
    },
    date: {
        type: String
    },
    quote: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published'
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
