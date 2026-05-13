const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createfaq, updatefaq, deleteFaq, allFaq, singleFaq } = require('../controller/faqCtrl');

const router = express.Router();

router.post('/', createfaq);

router.put('/update/:id', updatefaq);

router.delete('/delete/:id', deleteFaq);

router.get('/all', allFaq);

router.get('/single/:id', singleFaq);

module.exports = router;