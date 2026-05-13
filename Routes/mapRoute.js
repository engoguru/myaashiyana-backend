const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createMaps, allMaps, singleMaps, updateMaps, deleteMaps } = require('../controller/mapCtrl');

const router = express.Router();

router.post('/', createMaps);

router.get('/all', allMaps);

router.get('/single/:id',singleMaps);

router.put('/update/:id', updateMaps);

router.delete('/delete/:id', deleteMaps);

module.exports = router;