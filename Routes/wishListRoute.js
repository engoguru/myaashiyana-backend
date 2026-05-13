const express = require("express");
const {
  createWishlistItem,
  getAllWishlistItems,
  getWishlistItemById,
  updateWishlistItem,
  deleteWishlistItem,
} = require("../controller/wishlistCtrl");

const router = express.Router();

router.post("/", createWishlistItem);           // Create
router.get("/", getAllWishlistItems);           // Get all
router.get("/:id", getWishlistItemById);        // Get single
router.put("/:id", updateWishlistItem);         // Update
router.delete("/:id", deleteWishlistItem);      // Delete

module.exports = router;
