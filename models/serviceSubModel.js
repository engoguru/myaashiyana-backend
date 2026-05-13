const mongoose = require("mongoose");

const serviceSubSchema = new mongoose.Schema ({
    content: {
        type:String,
    }
}, { timestamps: true });

module.exports = mongoose.model('ServiceSub', serviceSubSchema);
