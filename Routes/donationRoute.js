const express = require("express");
const {
    createDonationOrder,
    verifyDonation,
    allDonations,
    singleDonation,
    deleteDonation,
    handleWebhook,
    topDonations,
} = require("../controller/donationCtrl");

const router = express.Router();
router.get("/top/new",topDonations)
router.post("/create-order", createDonationOrder);
router.post("/verify", verifyDonation);
router.post("/webhook", handleWebhook);

router.get("/", allDonations);



router.get("/:id", singleDonation);
router.delete("/:id", deleteDonation);

module.exports = router;
