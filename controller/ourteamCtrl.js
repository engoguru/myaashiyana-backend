
const asyncHandler = require('express-async-handler');
const ourteamModel = require('../models/ourteamModel');

const createourteam = asyncHandler(async (req, res) => {
    try {
        console.log("Received Payload:", req.body)
        const newData = await ourteamModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updateourteam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await ourteamModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteourteam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await ourteamModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allourteam = asyncHandler(async (req, res) => {
    try {
        const data = await ourteamModel.find({});
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleourteam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await ourteamModel.findById(id);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createourteam,
    updateourteam,
    deleteourteam,
    allourteam,
    singleourteam
}