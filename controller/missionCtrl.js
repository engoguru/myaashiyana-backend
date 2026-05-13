const missionModel = require("../models/missionModel");
const asyncHandler = require('express-async-handler');

const createMission = asyncHandler(async(req, res) => {
    try {
        const newData = await missionModel.create(req.body);
        res.json(newData);
    } catch (error) {
        throw new Error(error);
    }
});


const updateMission = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const updated = await missionModel.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteMission = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const deleted = await missionModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
});

const allMission = asyncHandler(async(req, res) => {
    try {
        const data = await missionModel.find();
        res.json(data);
    } catch (error) {
        throw new Error(error);
    }
});

const singleMission = asyncHandler(async(req, res) => {
    const {id} = req.params;
    try {
        const data = await missionModel.findById(id);
        res.json(data)
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
createMission,
    updateMission,
    deleteMission,
    allMission,
    singleMission
}