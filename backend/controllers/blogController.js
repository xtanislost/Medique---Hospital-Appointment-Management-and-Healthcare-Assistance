import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import blogModel from "../models/blogModel.js";

// API for adding a blog
const addBlog = async (req, res) => {
    try {
        const { title, description, content, category, author } = req.body;
        const imageFile = req.file;

        // ✅ Validate required fields
        if (!title || !description || !content || !category || !author) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // ✅ Validate description length
        if (description.length < 10) {
            return res.status(400).json({ success: false, message: "Description must be at least 10 characters." });
        }

        let imageUrl = null;

        // ✅ Upload image if provided
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        }

        // ✅ Create blog
        const blogData = {
            title,
            description,
            content,
            category,
            author,
            image: imageUrl,
            date: Date.now(),
        };

        const newBlog = new blogModel(blogData);
        await newBlog.save();
        res.status(201).json({ success: true, message: "Blog Added", blog: newBlog });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to get a single blog by ID
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if valid ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Blog ID" });
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, blog });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to update a blog
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content, category, author } = req.body;
        const imageFile = req.file;

        // ✅ Validate required fields
        if (!title || !description || !content || !category || !author) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        let updateData = { title, description, content, category, author };

        // ✅ Upload new image if provided
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog Updated", blog: updatedBlog });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to delete a blog
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if valid ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Blog ID" });
        }

        const deletedBlog = await blogModel.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.status(200).json({ success: true, message: "Blog Deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
