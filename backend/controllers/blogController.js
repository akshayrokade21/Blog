import { Blog } from "../models/blogSchema.js";
import { User } from '../models/userSchema.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const createdBy = req.user._id;
        const thumbnailPath = req.file ? req.file.path : null;

        const data = await Blog.create({
            title,
            content,
            thumbnail: thumbnailPath,
            createdBy
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: { blogs: data }
        }, { new: true });

        res.status(201).send({
            message: "Blog created successfully",
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "An error occurred while creating the blog",
            error: error.message
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findByIdAndDelete(blogid);

        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }

        if (blog.thumbnail) {
            deleteOldImage(blog.thumbnail);
        }

        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { blogs: { _id: blogid } } },
            { new: true }
        );

        res.status(200).send({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "An error occurred while deleting the blog",
            error: error.message
        });
    }
};

const deleteOldImage = (oldImagePath) => {
    if (oldImagePath) {
        const filePath = path.resolve(__dirname, '..', oldImagePath);
        fs.unlink(filePath, (err) => {
            if (err && err.code === 'ENOENT') {
                console.log('Image not found, nothing to delete');
            } else if (err) {
                console.error('Error deleting old image:', err);
            }
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const { title, content } = req.body;
        const thumbnailPath = req.file ? req.file.path : null;

        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }

        if (thumbnailPath && blog.thumbnail) {
            deleteOldImage(blog.thumbnail);
        }

        const data = await Blog.findByIdAndUpdate(blogid, {
            $set: {
                title,
                content,
                thumbnail: thumbnailPath || blog.thumbnail
            }
        }, { new: true });

        res.status(200).send({
            message: "Blog updated successfully",
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "An error occurred while updating the blog",
            error: error.message
        });
    }
};

export const getallBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).send(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "An error occurred while fetching blogs",
            error: error.message
        });
    }
};

export const getBlogbyid = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid blog ID format' });
        }
        const blog = await Blog.findOne({ _id: id });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).send(blog);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "An error occurred while fetching the blog",
            error: error.message
        });
    }
};

export const getBlogbyuserid = async (req, res) => {
    try {
        const userid = req.params.userid;
        const blogs = await Blog.find({ createdBy: userid });

        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found for this user' });
        }

        res.status(200).send(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "An error occurred while fetching blogs by user",
            error: error.message
        });
    }
};
