const emailModel = require("../models/emailModel");
const asyncHandler = require('express-async-handler');

const createEmail = asyncHandler(async(req, res) => {
    try {
        const newData = await emailModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updateEmail = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await emailModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteEmail = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await emailModel.findByIdAndDelete(id);
        res.json(deleted)
    } catch (error) {
        throw new Error(error);
    }
});

const allEmail = asyncHandler(async(req, res) => {
    try {
        const data = await emailModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error)
    }
});

const singleEmail = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await emailModel.findById(id);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createEmail,
    updateEmail,
    deleteEmail,
    allEmail,
    singleEmail
}