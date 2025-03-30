import express from 'express';
import { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const blogRouter = express.Router();

blogRouter.post('/add-blog', authAdmin, upload.single('image'), addBlog);
blogRouter.get('/all-blogs', getAllBlogs);
blogRouter.get('/blog/:id', getBlogById);
blogRouter.put('/update-blog/:id', authAdmin, upload.single('image'), updateBlog);
blogRouter.delete('/delete-blog/:id', authAdmin, deleteBlog);

export default blogRouter;
