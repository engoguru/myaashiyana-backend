const asyncHandler = require('express-async-handler');
const galleryModel = require('../models/galleryModel');


const creategallery = asyncHandler(async(req, res) => {
    try {
        const newData = await galleryModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updategallery = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await galleryModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deletegallery = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await galleryModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allgallery = asyncHandler(async(req, res) => {
    try {
        const data = await galleryModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singlegallery = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await galleryModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    creategallery,
    updategallery,
    deletegallery,
    allgallery,
    singlegallery
}