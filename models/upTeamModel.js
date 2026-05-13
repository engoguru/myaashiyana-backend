const mongoose = require('mongoose');

const upTeamSchema = new mongoose.Schema({
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    title: {
        type: String
    },
    position: {
        type: String
    },
    description: {
        type: String
    },

}, { timestamps: true });

module.exports = mongoose.model('UpTeam', upTeamSchema)