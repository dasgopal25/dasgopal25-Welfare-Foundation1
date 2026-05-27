const express = require('express');
const router = express.Router();
const { getPublicBlogs, getBlogBySlug, getFeaturedBlogs, getLatestBlogs } = require('../../controllers/public/publicBlogController');

router.get('/', getPublicBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/latest', getLatestBlogs);
router.get('/:slug', getBlogBySlug);

module.exports = router;
