const asyncHandler = require('express-async-handler');
const faqModel = require("../models/faqModel")


const createfaq = asyncHandler(async (req, res) => {
    try {
        const newData = await faqModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updatefaq = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await faqModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteFaq = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await faqModel.findByIdAndDelete(id);
        res.json(deleted)
    } catch (error) {
        throw new Error(error);
    }
});

const allFaq = asyncHandler(async(req, res) => {
    try {
        const data = await faqModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error)
    }
});

const singleFaq = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await faqModel.findById(id);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
   createfaq,
   updatefaq,
   deleteFaq,
   singleFaq,
   allFaq
}