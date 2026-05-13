const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },

        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },

        amount: {
            type: Number,
            required: true,
        },

        razorpayOrderId: {
            type: String,
        },
        razorpayPaymentId: {
            type: String,
        },
        razorpaySignature: {
            type: String,
        },

        paymentStatus: {
            type: String,
            default: "success",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
