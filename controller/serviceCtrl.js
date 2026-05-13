const serviceModel = require("../models/serviceModel");
const asyncHandler = require('express-async-handler');

const createServices = asyncHandler(async(req, res) => {
    try {
        const newData = await serviceModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updateServices = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await serviceModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteServices = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await serviceModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allServices = asyncHandler(async(req, res) => {
    try {
        const data = await serviceModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleServices = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await serviceModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createServices,
    updateServices,
    deleteServices,
    allServices,
    singleServices
}