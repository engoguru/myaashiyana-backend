const mongoose = require('mongoose');

const ourteamSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    position: {
        type: String
    },
    description: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('ourteam', ourteamSchema);