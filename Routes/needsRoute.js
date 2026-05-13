const express = require("express");
const router = express.Router();
const {
  creatNeeds,
  getallneeds,
  getsingleneeds,
  updateallneeds,
  deleteneeds,
  createNeedOrder,
} = require("../controller/needCtrl");

router.post("/create", creatNeeds);
router.get("/all", getallneeds);
router.get("/single/:id", getsingleneeds);
router.put("/update/:id", updateallneeds);
router.delete("/delete/:id", deleteneeds);

// Payment routes
router.post("/create-order", createNeedOrder);

module.exports = router;
