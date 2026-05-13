const testimonialsModel = require("../models/testimonialsModel");
const asyncHandler = require('express-async-handler');

const createtestimonials = asyncHandler(async(req, res) => {
    try {
        const newData = await testimonialsModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updatetestimonials = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await testimonialsModel.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deletetestimonials = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await testimonialsModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const alltestimonials = asyncHandler(async(req, res) => {
    try {
        const data = await testimonialsModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singletestimonials = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await testimonialsModel.findById(id);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createtestimonials,
    updatetestimonials,
    deletetestimonials,
    alltestimonials,
    singletestimonials
}