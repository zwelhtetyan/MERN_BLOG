const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const {
   getAllBlogs,
   getBlog,
   createBlog,
   updateBlog,
   deleteBlog,
} = require('../controllers/blog');

const router = express.Router();

// requireAuth for all blog routes
// router.use(requireAuth);

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
