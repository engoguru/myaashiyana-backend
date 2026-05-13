const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createPhone, updatePhone, deletePhone, allPhone, singlePhone } = require('../controller/phoneCtrl');

const router = express.Router();

router.post('/', createPhone);

router.put('/update/:id', updatePhone);

router.delete('/delete/:id', deletePhone);

router.get('/all', allPhone);

router.get('/single/:id', singlePhone);

module.exports = router;
