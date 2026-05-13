const express = require('express');
const { createServices, allServices, singleServices, updateServices, deleteServices } = require('../controller/serviceCtrl');

const router = express.Router();

router.post('/', createServices);

router.get('/all', allServices);

router.get('/single/:id', singleServices);

router.put('/update/:id',updateServices);

router.delete('/delete/:id', deleteServices);

module.exports = router;