const asyncHandler = require('express-async-handler');
const programeModel = require('../models/programeModel');
const slugify = require("slugify");

// Create Programme (Animal)
const createprograme = asyncHandler(async (req, res) => {
    try {
        let baseSlug = slugify(req.body.name, { lower: true });
        let slug = baseSlug;
        let count = 1;

        // Ensure slug uniqueness
        while (await programeModel.findOne({ slug })) {
            slug = `${baseSlug}-${count}`;
            count++;
        }

        const progObj = {
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            rescueStory: req.body.rescueStory,
            medicalCondition: req.body.medicalCondition,
            monthlyCareCost: req.body.monthlyCareCost,
            status: req.body.status || 'Available',
            content: req.body.content,
            images: req.body.images,
            slug: slug,
        };

        const prog = await new programeModel(progObj).save();

        res.status(201).json({
            success: true,
            message: "Animal program created successfully!",
            prog,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// Update Programme
const updateprograme = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await programeModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ success: false, message: "Update Failed", error: error.message });
    }
});

// Delete Programme
const deleteprograme = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await programeModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Animal program deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Delete Failed", error: error.message });
    }
});

// Get All Programmes
const allprograme = asyncHandler(async (req, res) => {
    try {
        const data = await programeModel.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch programs", error: error.message });
    }
});

// Get Single Programme by ID
const singleprograme = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await programeModel.findById(id);
        if (!data) {
            return res.status(404).json({ success: false, message: "Animal not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
    }
});

// Get Single Programme by Slug
const singleBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    try {
        const getSingle = await programeModel.findOne({ slug });
        if (!getSingle) {
            return res.status(404).json({ success: false, message: "Animal not found" });
        }
        res.json(getSingle);
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
    }
});

module.exports = {
    createprograme,
    updateprograme,
    deleteprograme,
    allprograme,
    singleprograme,
    singleBySlug,
};
