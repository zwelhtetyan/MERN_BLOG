const { ObjectID } = require('bson');
const Blog = require('../models/blog');

// get all blogs
const getAllBlogs = async (req, res) => {
   try {
      const allBlogs = await Blog.find().sort({ createdAt: -1 });
      res.status(200).json(allBlogs);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// get single blog
const getBlog = async (req, res) => {
   const { blogId } = req.params;

   if (!ObjectID.isValid(blogId))
      return res.status(404).json({ error: 'no such workout with that Id :)' });

   try {
      const blog = await Blog.findById({ _id: blogId });
      res.status(200).json(blog);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// create new blog
const createBlog = async (req, res) => {
   try {
      const blog = await Blog.create(req.body);
      res.status(200).json(blog);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

// update blog
const updateBlog = async (req, res) => {
   const { blogId } = req.params;

   try {
      const blog = await Blog.findOneAndUpdate({ _id: blogId }, req.body);
      res.status(200).json(blog);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// delete blog
const deleteBlog = async (req, res) => {
   const { blogId } = req.params;

   try {
      const blog = await Blog.findOneAndDelete({ _id: blogId });
      res.status(200).json(blog);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = {
   getAllBlogs,
   getBlog,
   createBlog,
   updateBlog,
   deleteBlog,
};
