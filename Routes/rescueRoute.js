const express = require("express");
const {
  createRescueStory,
  getAllRescueStories,
  getRescueStoryById,
  updateRescueStory,
  deleteRescueStory,
} = require("../controller/rescueController");

const router = express.Router();

router.post("/", createRescueStory); 
router.get("/", getAllRescueStories); 
router.get("/:id", getRescueStoryById);
router.put("/:id", updateRescueStory); 
router.delete("/:id", deleteRescueStory); 

module.exports = router;
