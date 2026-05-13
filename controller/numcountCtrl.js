const asyncHandler = require('express-async-handler');
const numcountModel = require('../models/numcountModel');


const createnumcount = asyncHandler(async(req, res) => {
    try {
        const newData = await numcountModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updatenumcount = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await numcountModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deletenumcount = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await numcountModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allnumcount = asyncHandler(async(req, res) => {
    try {
        const data = await numcountModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singlenumcount = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await numcountModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createnumcount,
    updatenumcount,
    deletenumcount,
    allnumcount,
    singlenumcount
}