const express = require('express');
const router = express.Router();
const { getPublicVideos } = require('../../controllers/public/publicVideoController');

router.get('/', getPublicVideos);

module.exports = router;