const mongoose = require("mongoose");

const NeedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    isCampaign: {
      type: Boolean,
      default: false,
    },
    fundingGoal: {
      type: Number,
      default: 0,
    },
    amountRaised: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "completed", "urgent"],
      default: "active",
    },
    neededProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    youtubeUrl: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Need", NeedSchema);
