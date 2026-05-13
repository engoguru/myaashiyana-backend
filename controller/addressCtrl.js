const addressModel = require("../models/addressModel");
const asyncHandler = require('express-async-handler');

const createAddress = asyncHandler(async(req, res) => {
    try {
        const newData = await addressModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updateAddress = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await addressModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteAddress = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await addressModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allAddress = asyncHandler(async(req, res) => {
    try {
        const data = await addressModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleAddress = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await addressModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    allAddress,
    singleAddress
}