const upTeamModel = require("../models/upTeamModel");
const asyncHandler = require('express-async-handler');

const createUpTeam = asyncHandler(async (req, res) => {
    try {
        const newData = await upTeamModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});

const updateUpTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await upTeamModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteUpTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await upTeamModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allUpTeam = asyncHandler(async (req, res) => {
    try {
        const data = await upTeamModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleUpTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await upTeamModel.findById(id);
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createUpTeam,
    updateUpTeam,
    deleteUpTeam,
    allUpTeam,
    singleUpTeam
}