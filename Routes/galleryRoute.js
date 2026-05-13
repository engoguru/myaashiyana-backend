const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const { creategallery, updategallery, deletegallery, allgallery, singlegallery } = require('../controller/galleryCtrl');


const router = express.Router();

router.post('/', creategallery);

router.get('/all', allgallery);

router.get('/single/:id', singlegallery);

router.put('/update/:id' ,updategallery);

router.delete('/delete/:id', deletegallery);

module.exports = router;