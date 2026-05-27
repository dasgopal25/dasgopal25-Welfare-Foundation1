const express = require('express');
const router = express.Router();
const { getSettings, updateSetting, updateMultipleSettings } = require('../../controllers/admin/settingsController');
const { protect } = require('../../middleware/authMiddleware');
const { admin } = require('../../middleware/adminMiddleware');

router.use(protect, admin);
router.get('/', getSettings);
router.put('/', updateSetting);
router.put('/bulk', updateMultipleSettings);

module.exports = router;
