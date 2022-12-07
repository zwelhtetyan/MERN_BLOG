const express = require('express');
const router = express.Router();
const {
   getAllBlogs,
   getBlog,
   createBlog,
   updateBlog,
   deleteBlog,
} = require('../controllers/blog');

// get all blogs
router.get('/', getAllBlogs);

// get single blog
router.get('/:blogId', getBlog);

// create new blog
router.post('/', createBlog);

// update blog
router.patch('/:blogId', updateBlog);

// delete blog
router.delete('/:blogId', deleteBlog);

module.exports = router;
