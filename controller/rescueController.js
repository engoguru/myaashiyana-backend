const RescueStory = require("../models/rescuestoriesModel");
const asyncHandler = require("express-async-handler");

// Create a rescue story
const createRescueStory = asyncHandler(async (req, res) => {
  try {
    const story = await RescueStory.create(req.body);
    res.status(201).json({ success: true, story });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Get all rescue stories
const getAllRescueStories = asyncHandler(async (req, res) => {
  try {
    const stories = await RescueStory.find().sort({ date: -1 });
    res.json({ success: true, stories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
  }
});

// Get single rescue story by ID
const getRescueStoryById = asyncHandler(async (req, res) => {
  try {
    const story = await RescueStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }
    res.json({ success: true, story });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
  }
});

// Update a rescue story
const updateRescueStory = asyncHandler(async (req, res) => {
  try {
    const updated = await RescueStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }
    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update Failed", error: error.message });
  }
});

// Delete a rescue story
const deleteRescueStory = asyncHandler(async (req, res) => {
  try {
    const deleted = await RescueStory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }
    res.json({ success: true, message: "Story deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete Failed", error: error.message });
  }
});

module.exports = {
  createRescueStory,
  getAllRescueStories,
  getRescueStoryById,
  updateRescueStory,
  deleteRescueStory,
};
