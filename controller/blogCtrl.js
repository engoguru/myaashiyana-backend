const asyncHandler = require('express-async-handler');
const blogModel = require('../models/blogModel');
const slugify = require("slugify");

// Create Blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        console.log("Received blog data:", req.body);
        
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ 
                success: false, 
                message: "Title and content are required" 
            });
        }

        let baseSlug = slugify(req.body.title, { lower: true });
        let slug = baseSlug;
        let count = 1;

        // Ensure slug uniqueness
        while (await blogModel.findOne({ slug })) {
            slug = `${baseSlug}-${count}`;
            count++;
        }

        const blogObj = {
            title: req.body.title,
            heading: req.body.heading || req.body.title,
            excerpt: req.body.excerpt,
            content: req.body.content,
            images: req.body.images || [],
            author: req.body.author || 'Admin',
            date: req.body.date,
            quote: req.body.quote,
            user: req.body.user,
            status: req.body.status || 'published',
            slug: slug,
        };

        console.log("Creating blog with:", blogObj);

        const blog = await new blogModel(blogObj).save();

        console.log("Blog created successfully:", blog);

        res.status(201).json({
            success: true,
            message: "Blog created successfully!",
            blog,
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // If title is being updated, regenerate slug
        if (req.body.title) {
            const existingBlog = await blogModel.findById(id);
            if (existingBlog && existingBlog.title !== req.body.title) {
                let baseSlug = slugify(req.body.title, { lower: true });
                let slug = baseSlug;
                let count = 1;

                while (await blogModel.findOne({ slug, _id: { $ne: id } })) {
                    slug = `${baseSlug}-${count}`;
                    count++;
                }
                req.body.slug = slug;
            }
        }

        const updated = await blogModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json({
            success: true,
            message: "Blog updated successfully!",
            blog: updated
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update Failed", error: error.message });
    }
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await blogModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Delete Failed", error: error.message });
    }
});

// Get All Blogs
const allBlogs = asyncHandler(async (req, res) => {
    try {
        const data = await blogModel.find().sort({ createdAt: -1 }).populate('user', 'firstname lastname email');
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch blogs", error: error.message });
    }
});

// Get Single Blog by ID
const singleBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await blogModel.findById(id).populate('user', 'firstname lastname email');
        if (!data) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
    }
});

// Get Single Blog by Slug
const singleBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    try {
        const getSingle = await blogModel.findOne({ slug }).populate('user', 'firstname lastname email');
        if (!getSingle) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json(getSingle);
    } catch (error) {
        res.status(500).json({ success: false, message: "Fetch Failed", error: error.message });
    }
});

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    allBlogs,
    singleBlog,
    singleBySlug,
};
