const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlogById } = require('../../controllers/admin/blogController');
const { protect } = require('../../middleware/authMiddleware');
const { admin } = require('../../middleware/adminMiddleware');
const { upload } = require('../../middleware/uploadMiddleware');

router.use(protect, admin);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', upload.single('image'), createBlog);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
