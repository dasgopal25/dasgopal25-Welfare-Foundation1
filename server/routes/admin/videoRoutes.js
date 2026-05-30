const express = require('express');
const router = express.Router();
const { getAllVideos, createVideo, updateVideo, deleteVideo } = require('../../controllers/admin/videoController');
const { protect } = require('../../middleware/authMiddleware');
const { admin } = require('../../middleware/adminMiddleware');

router.use(protect, admin);
router.get('/', getAllVideos);
router.post('/', createVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;