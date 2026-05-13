const need = require("../models/needsModel");
const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const creatNeeds = asyncHandler(async (req, res) => {
  try {
    const needs = await need.create(req.body);
    res.status(201).json({ success: true, needs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
});

const getallneeds = asyncHandler(async (req, res) => {
  try {
    const allneeds = await need.find()
      .populate("neededProducts")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All needs are fetched successfully",
      allneeds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " error while get all needs",
      error: error.message,
    });
  }
});

const getsingleneeds = asyncHandler(async (req, res) => {
  try {
    const getsingle = await need.findById(req.params.id).populate("neededProducts");
    if (!getsingle) {
      return res.status(400).json({
        success: false,
        message: "needs are not found",
      });
    }
    res.json({
      success: true,
      getsingle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "fetch failed",
      error: error.message,
    });
  }
});

const updateallneeds = asyncHandler(async (req, res) => {
  try {
    const updateneeds = await need.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateneeds) {
      return res.status(404).json({
        success: false,
        message: "needs is not fopund",
      });
    }
    res.status(200).json({
      success: true,
      message: "updated successfully",
      updateneeds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "error while updating",
    });
  }
});

const deleteneeds = asyncHandler(async (req, res) => {
  try {
    const deleted = await need.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: "needs is not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "needs are deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while delete needs",
      error: error.message,
    });
  }
});

// RAZORPAY INTEGRATION FOR NEEDS
const createNeedOrder = asyncHandler(async (req, res) => {
  try {
    const { amount, needId, productId } = req.body;
    const options = {
      amount: amount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_need_${Date.now()}`,
      notes: {
        needId: needId,
        productId: productId || "direct_donation",
      },
    };
    const order = await razorpay.orders.create(options);
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
});

const handleNeedWebhook = asyncHandler(async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const shasum = crypto.createHmac("sha256", secret)
    .update(req.body)
    .digest("hex");

  const signature = req.headers["x-razorpay-signature"];

  if (shasum !== signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const event = JSON.parse(req.body.toString("utf8"));

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const amount = payment.amount / 100;
    const needId = payment.notes.needId;
    
    if (needId) {
      await need.findByIdAndUpdate(needId, { $inc: { amountRaised: amount } });
    }
  }
  res.status(200).json({ status: "ok" });
});

module.exports = {
  creatNeeds,
  getallneeds,
  getsingleneeds,
  updateallneeds,
  deleteneeds,
  createNeedOrder,
  handleNeedWebhook,
};
