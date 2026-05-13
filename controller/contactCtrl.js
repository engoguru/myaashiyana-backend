const asyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');



const createcontact = asyncHandler(async(req, res) => {
    try {
        const newData = await contactModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updatecontact = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await contactModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deletecontact = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await contactModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allcontact = asyncHandler(async(req, res) => {
    try {
        const data = await contactModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singlecontact = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await contactModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createcontact,
    updatecontact,
    deletecontact,
    allcontact,
    singlecontact
}