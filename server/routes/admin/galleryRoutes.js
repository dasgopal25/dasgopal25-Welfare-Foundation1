const express = require('express');
const router = express.Router();
const { getAllImages, addImage, updateImage, deleteImage } = require('../../controllers/admin/galleryController');
const { protect } = require('../../middleware/authMiddleware');
const { admin } = require('../../middleware/adminMiddleware');
const { upload } = require('../../middleware/uploadMiddleware');

router.use(protect, admin);
router.get('/', getAllImages);
router.post('/', upload.single('image'), addImage);
router.put('/:id', upload.single('image'), updateImage);
router.delete('/:id', deleteImage);

module.exports = router;
