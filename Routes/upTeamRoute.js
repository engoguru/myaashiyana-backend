const express = require('express');
const { createUpTeam, allUpTeam, singleUpTeam, updateUpTeam, deleteUpTeam } = require('../controller/upTeamCtrl');

const router = express.Router();

router.post('/', createUpTeam);

router.get('/all', allUpTeam);

router.get('/single/:id', singleUpTeam);

router.put('/update/:id',  updateUpTeam);

router.delete('/delete/:id', deleteUpTeam);

module.exports = router;