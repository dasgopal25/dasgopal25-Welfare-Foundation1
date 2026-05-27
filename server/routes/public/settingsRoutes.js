const express = require('express');
const router = express.Router();
const { getPublicSettings, getGallery } = require('../../controllers/public/publicSettingsController');

router.get('/', getPublicSettings);
router.get('/gallery', getGallery);

module.exports = router;
