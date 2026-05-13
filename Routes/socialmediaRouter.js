const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createsocialmedia, updatesocialmedia, deletesocialmedia, allsocialmedia, singlesocialmedia } = require('../controller/socialmediaCtrl');

const router = express.Router();

router.post('/', createsocialmedia);

router.put('/update/:id', updatesocialmedia);

router.delete('/delete/:id', deletesocialmedia);

router.get('/all', allsocialmedia);

router.get('/single/:id', singlesocialmedia);

module.exports = router;
