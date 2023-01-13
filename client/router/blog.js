const express = require('express');

const {
   getAllBlogs,
   getBlog,
   createBlog,
   updateBlog,
   deleteBlog,
   getPostByTag,
} = require('../controllers/blog');

const router = express.Router();

// get all blogs
router.get('/', getAllBlogs);

// get post by tag
router.get('/tags/:tagName', getPostByTag);

// get single blog
router.get('/:blogId', getBlog);

// create new blog
router.post('/', createBlog);

// update blog
router.patch('/:blogId', updateBlog);

// delete blog
router.delete('/:blogId', deleteBlog);

module.exports = router;
