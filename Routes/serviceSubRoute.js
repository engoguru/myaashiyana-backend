const express = require('express');
const { createServicesSub, allServicesSub, singleServicesSub, updateServicesSub, deleteServicesSub } = require('../controller/serviceSubCtrl');

const router = express.Router();

router.post('/', createServicesSub);

router.get('/all', allServicesSub);

router.get('/single/:id', singleServicesSub);

router.put('/update/:id',updateServicesSub);

router.delete('/delete/:id', deleteServicesSub);

module.exports = router;