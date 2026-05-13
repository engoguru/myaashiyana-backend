const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    trim: true,
  },
  need: {
    type: String,
    required: true,
    trim: true,
  },
  cost: {
    type: String,
    required: true,
    trim: true,
  },
  amazon: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("WishlistItem", wishlistItemSchema);
