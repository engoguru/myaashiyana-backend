const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createnumcount, allnumcount, singlenumcount, updatenumcount, deletenumcount } = require('../controller/numcountCtrl');


const router = express.Router();

router.post('/', createnumcount);

router.get('/all', allnumcount);

router.get('/single/:id', singlenumcount);

router.put('/update/:id',updatenumcount);

router.delete('/delete/:id', deletenumcount);

module.exports = router;