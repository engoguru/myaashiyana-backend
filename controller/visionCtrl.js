const asyncHandler = require('express-async-handler');
const visionModel = require('../models/visionModel');

const createVision = asyncHandler(async(req, res) => {
    try {
        const newData = await visionModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updateVision = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await visionModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteVision = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await visionModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allVision = asyncHandler(async(req, res) => {
    try {
        const data = await visionModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleVision = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await visionModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createVision,
    updateVision,
    deleteVision,
    allVision,
    singleVision
}