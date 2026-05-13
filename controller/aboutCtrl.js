const aboutModel = require("../models/aboutModel");
const asyncHandler = require('express-async-handler');

const createAbout = asyncHandler(async(req, res) => {
    try {
        const newData = await aboutModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updateAbout = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await aboutModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteAbout = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await aboutModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allAbout = asyncHandler(async(req, res) => {
    try {
        const data = await aboutModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleAbout = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await aboutModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createAbout,
    updateAbout,
    deleteAbout,
    allAbout,
    singleAbout
}