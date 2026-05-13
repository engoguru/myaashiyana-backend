const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createourteam, allourteam, singleourteam, updateourteam, deleteourteam } = require('../controller/ourteamCtrl');

const router = express.Router();

router.post('/', createourteam);

router.get('/all', allourteam);

router.get('/single/:id', singleourteam);

router.put('/update/:id', updateourteam);

router.delete('/delete/:id', deleteourteam);

module.exports = router;