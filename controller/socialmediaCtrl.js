const socialmediaModel = require("../models/socialmediaModel");
const asyncHandler = require('express-async-handler');

const createsocialmedia = asyncHandler(async (req, res) => {
    try {
        const newData = await socialmediaModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updatesocialmedia = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await socialmediaModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deletesocialmedia = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await socialmediaModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allsocialmedia = asyncHandler(async (req, res) => {
    try {
        const data = await socialmediaModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singlesocialmedia = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await socialmediaModel.findById(id);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createsocialmedia,
    updatesocialmedia,
    deletesocialmedia,
    allsocialmedia,
    singlesocialmedia
}