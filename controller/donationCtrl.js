const Donation = require("../models/donationModel");
const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const crypto = require("crypto");

/* ================= CREATE RAZORPAY INSTANCE ================= */
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= CREATE ORDER ================= */
const createDonationOrder = asyncHandler(async (req, res) => {
    const { amount, donor } = req.body;

    if (!amount || amount <= 0) {
        res.status(400);
        throw new Error("Invalid donation amount");
    }

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `don_${Date.now()}`,
            notes: {
                name: donor?.name,
                email: donor?.email,
                phone: donor?.phone,
            },
        });

        res.json(order);
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "Razorpay order creation failed");
    }
});

/* ================= VERIFY & SAVE DONATION ================= */
const verifyDonation = asyncHandler(async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        donor,
        amount,
    } = req.body;

    try {
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            res.status(400);
            throw new Error("Payment verification failed");
        }

        // Check if already saved via webhook
        const existingDonation = await Donation.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (existingDonation) {
            return res.status(200).json(existingDonation);
        }

        const newDonation = await Donation.create({
            name: donor?.name,
            email: donor?.email,
            phone: donor?.phone,
            amount,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
        });

        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "Donation verification failed");
    }
});

/* ================= HANDLE WEBHOOK ================= */
const handleWebhook = asyncHandler(async (req, res) => {
    console.log("🔔 Razorpay Webhook Received");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
        console.error("❌ RAZORPAY_WEBHOOK_SECRET is missing in .env");
        return res.status(500).json({ error: "Webhook secret missing" });
    }

    const razorpaySignature = req.headers["x-razorpay-signature"];
    if (!razorpaySignature) {
        console.error("❌ Missing x-razorpay-signature header");
        return res.status(400).json({ status: "Missing signature" });
    }

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(req.body); // req.body must be raw Buffer
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) {
        console.error("❌ Invalid Webhook Signature Match Failed");
        return res.status(400).json({ status: "Invalid signature" });
    }

    console.log("✅ Webhook Signature Verified");

    // Manual Parse because body is Raw Buffer
    let payload;
    try {
        payload = JSON.parse(req.body.toString());
    } catch (e) {
        console.error("❌ Failed to parse webhook body:", e.message);
        return res.status(400).json({ status: "Invalid JSON" });
    }

    const event = payload.event;
    console.log(`📩 Webhook Event: ${event}`);

    if (event === "payment.captured") {
        const payment = payload.payload.payment.entity;
        const notes = payment.notes || {};

        console.log(`💰 Payment Captured: ${payment.id} for Order: ${payment.order_id}`);

        // Check if donation already exists
        const existingDonation = await Donation.findOne({
            razorpayOrderId: payment.order_id,
        });

        if (!existingDonation) {
            await Donation.create({
                name: notes.name || "Anonymous/Webhook",
                email: payment.email,
                phone: payment.contact,
                amount: payment.amount / 100,
                razorpayOrderId: payment.order_id,
                razorpayPaymentId: payment.id,
                razorpaySignature: razorpaySignature,
                paymentStatus: "success",
            });
            console.log("💾 Donation saved via Webhook ✅");
        } else {
            console.log("⏭️ Donation already exists (likely saved via verify API), skipping Webhook save.");
        }
    }
    res.status(200).json({ status: "ok" });
});

/* ================= GET ALL DONATIONS (ADMIN) ================= */
const allDonations = asyncHandler(async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });

        res.json(donations);
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "Failed to fetch donations");
    }
});
const topDonations = asyncHandler(async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [donations, todayDonations] = await Promise.all([
      Donation.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Donation.find({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
        .sort({ amount: -1 }) // replace amount with your field name
        .limit(5),
    ]);

    res.json({
      donations,
      todayDonations,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "Failed to fetch donations");
  }
});

/* ================= GET SINGLE DONATION ================= */
const singleDonation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findById(id);

        if (!donation) {
            res.status(404);
            throw new Error("Donation not found");
        }

        res.json(donation);
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "Failed to fetch donation");
    }
});

/* ================= DELETE DONATION ================= */
const deleteDonation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Donation.findByIdAndDelete(id);

        if (!deleted) {
            res.status(404);
            throw new Error("Donation not found");
        }

        res.json(deleted);
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "Failed to delete donation");
    }
});

module.exports = {
    createDonationOrder,
    verifyDonation,
    allDonations,
    singleDonation,
    deleteDonation,
    handleWebhook,
    topDonations

};
