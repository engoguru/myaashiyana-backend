const WishlistItem = require("../models/Wishlistmodel");
const asyncHandler = require("express-async-handler");

// Create a wishlist item
const createWishlistItem = asyncHandler(async (req, res) => {
    try {
        const item = await WishlistItem.create(req.body);
        res.status(201).json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Get all wishlist items
const getAllWishlistItems = asyncHandler(async (req, res) => {
    try {
        const items = await WishlistItem.find().sort({ createdAt: -1 });
        res.json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
    }
});

// Get a single wishlist item by ID
const getWishlistItemById = asyncHandler(async (req, res) => {
    try {
        const item = await WishlistItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Wishlist item not found" });
        }
        res.json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
    }
});

// Update a wishlist item
const updateWishlistItem = asyncHandler(async (req, res) => {
    try {
        const updated = await WishlistItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Wishlist item not found" });
        }
        res.json({ success: true, updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update Failed", error: error.message });
    }
});

// Delete a wishlist item
const deleteWishlistItem = asyncHandler(async (req, res) => {
    try {
        const deleted = await WishlistItem.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Wishlist item not found" });
        }
        res.json({ success: true, message: "Wishlist item deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Delete Failed", error: error.message });
    }
});

module.exports = {
    createWishlistItem,
    getAllWishlistItems,
    getWishlistItemById,
    updateWishlistItem,
    deleteWishlistItem,
};
