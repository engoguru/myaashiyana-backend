const express = require("express");
const {
    createDonationOrder,
    verifyDonation,
    allDonations,
    singleDonation,
    deleteDonation,
    handleWebhook,
} = require("../controller/donationCtrl");

const router = express.Router();

router.post("/create-order", createDonationOrder);
router.post("/verify", verifyDonation);
router.post("/webhook", handleWebhook);

router.get("/", allDonations);
router.get("/:id", singleDonation);
router.delete("/:id", deleteDonation);

module.exports = router;
