const { ObjectID } = require('bson');
const Blog = require('../models/blog');

// get all blogs
const getAllBlogs = async (req, res) => {
   const limit = req.query.limit || 5;
   const page = req.query.page || 0;

   try {
      const allBlogs = await Blog.find()
         .limit(limit)
         .skip(limit * page)
         .sort({ createdAt: -1 });

      res.status(200).json(allBlogs);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// get single blog
const getBlog = async (req, res) => {
   const { blogId } = req.params;

   if (!ObjectID.isValid(blogId))
      return res.status(404).json({
         error: `No such article with that Id: "${blogId}" !`,
      });

   try {
      const blog = await Blog.findById({ _id: blogId });
      res.status(200).json(blog);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// create new blog
const createBlog = async (req, res) => {
   const { title, tags, body } = req.body;

   const emptyField = [];

   if (!title) {
      emptyField.push('title');
   }
   if (!tags.length) {
      emptyField.push('tags');
   }
   if (!body) {
      emptyField.push('body');
   }

   if (emptyField.length) {
      return res
         .status(400)
         .json({ error: 'Please fill in all fields.', emptyField });
   }

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
      res.status(400).json({ error: error.message });
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
