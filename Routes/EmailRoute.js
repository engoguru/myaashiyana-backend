const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { createEmail, updateEmail, deleteEmail, allEmail, singleEmail } = require('../controller/emailCtrl');

const router = express.Router();

router.post('/', createEmail);

router.put('/update/:id', updateEmail);

router.delete('/delete/:id', deleteEmail);

router.get('/all', allEmail);

router.get('/single/:id', singleEmail);

module.exports = router;