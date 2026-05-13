const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createprograme, allprograme, singleprograme, updateprograme, deleteprograme, singleBySlug } = require('../controller/programeCtrl');

const router = express.Router();

router.post('/', createprograme);

router.get('/all', allprograme);

router.get('/single/:id', singleprograme);

router.put('/update/:id', updateprograme);  

router.delete('/delete/:id', deleteprograme);

router.get('/:slug', singleBySlug);

module.exports = router;