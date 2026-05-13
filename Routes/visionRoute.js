const express = require('express');
const { createVision, allVision, singleVision, updateVision, deleteVision } = require('../controller/visionCtrl');

const router = express.Router();

router.post('/', createVision);

router.get('/all', allVision);

router.get('/single/:id', singleVision);

router.put('/update/:id', updateVision);

router.delete('/delete/:id', deleteVision);

module.exports = router;