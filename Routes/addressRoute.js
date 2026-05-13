const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createAddress, allAddress, singleAddress, updateAddress, deleteAddress } = require('../controller/addressCtrl');

const router = express.Router();

router.post('/', createAddress);

router.get('/all', allAddress);

router.get('/single/:id', singleAddress);

router.put('/update/:id' ,updateAddress);

router.delete('/delete/:id' , deleteAddress);

module.exports = router;