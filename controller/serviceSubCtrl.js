const serviceSubModel = require("../models/serviceSubModel");
const asyncHandler = require('express-async-handler');

const createServicesSub = asyncHandler(async(req, res) => {
    try {
        const newData = await serviceSubModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updateServicesSub = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await serviceSubModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteServicesSub = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await serviceSubModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allServicesSub = asyncHandler(async(req, res) => {
    try {
        const data = await serviceSubModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleServicesSub = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await serviceSubModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createServicesSub,
    updateServicesSub,
    deleteServicesSub,
    allServicesSub,
    singleServicesSub
}