const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createcontact, allcontact, singlecontact, deletecontact, updatecontact } = require('../controller/contactCtrl');


const router = express.Router();

router.post('/', createcontact);

router.get('/all', allcontact);

router.get('/single/:id', singlecontact);

router.put('/update/:id',updatecontact);

router.delete('/delete/:id', deletecontact);

module.exports = router;