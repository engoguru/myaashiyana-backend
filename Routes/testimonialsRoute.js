const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createtestimonials, alltestimonials, singletestimonials, updatetestimonials, deletetestimonials } = require('../controller/testimonialsCtrl');

const router = express.Router();

router.post('/', createtestimonials);

router.get('/all', alltestimonials);

router.get('/single/:id', singletestimonials);

router.put('/update/:id', authMiddleware,updatetestimonials);

router.delete('/delete/:id', authMiddleware, deletetestimonials);

module.exports = router;