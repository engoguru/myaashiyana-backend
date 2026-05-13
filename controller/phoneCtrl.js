const phoneModel = require("../models/phoneModel");
const asyncHandler = require('express-async-handler');

const createPhone = asyncHandler(async(req, res) => {
    try {
        const newData = await phoneModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updatePhone = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await phoneModel.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deletePhone = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await phoneModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allPhone = asyncHandler(async(req, res) => {
    try {
        const data = await phoneModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singlePhone = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await phoneModel.findById(id);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createPhone,
    updatePhone,
    deletePhone,
    allPhone,
    singlePhone
}