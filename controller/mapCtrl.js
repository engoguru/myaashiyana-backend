const mapModel = require("../models/mapModel");
const asyncHandler = require('express-async-handler');

const createMaps = asyncHandler(async(req,res) => {
    try {
        const newLink = await mapModel.create(req.body);
        res.json(newLink);
    } catch (error) {
        throw new Error(error);
    }
});

const allMaps = asyncHandler(async(req,res) => {
    try {
        const getAll = await mapModel.find();
        res.json(getAll)
    } catch (error) {
        throw new Error(error);
    }
});

const singleMaps = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const getSingle = await mapModel.findById(id);
        res.json(getSingle);
    } catch (error) {
        throw new Error(error);
    }
});

const updateMaps = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const update = await mapModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(update);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteMaps = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await mapModel.findByIdAndDelete(id);
        res.json(deleted);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {createMaps, allMaps, singleMaps, updateMaps, deleteMaps};