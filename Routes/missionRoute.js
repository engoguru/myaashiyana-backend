const express = require('express');
const { createMission, updateMission, deleteMission, allMission, singleMission } = require('../controller/missionCtrl');

const router = express.Router();

router.post('/', createMission);

router.get('/all', allMission);

router.get('/single/:id', singleMission);

router.put('/update/:id',updateMission);

router.delete('/delete/:id', deleteMission);

module.exports = router;