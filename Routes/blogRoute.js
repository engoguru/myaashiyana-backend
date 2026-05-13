const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { 
    createBlog, 
    allBlogs, 
    singleBlog, 
    updateBlog, 
    deleteBlog, 
    singleBySlug 
} = require('../controller/blogCtrl');

const router = express.Router();

// Create blog
router.post('/', createBlog);

// Get all blogs
router.get('/all', allBlogs);

// Get single blog by ID
router.get('/single/:id', singleBlog);

// Update blog
router.put('/update/:id', updateBlog);

// Delete blog
router.delete('/delete/:id', deleteBlog);

// Get single blog by slug
router.get('/:slug', singleBySlug);

module.exports = router;
