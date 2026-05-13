const express = require('express');
const { createAbout, allAbout, singleAbout, updateAbout, deleteAbout } = require('../controller/aboutCtrl');

const router = express.Router();

router.post('/', createAbout);

router.get('/all', allAbout);

router.get('/single/:id', singleAbout);

router.put('/update/:id',updateAbout);

router.delete('/delete/:id', deleteAbout);

module.exports = router;