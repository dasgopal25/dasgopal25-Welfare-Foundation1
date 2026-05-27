const express = require('express');
const router = express.Router();
const { loginAdmin, getProfile, updateProfile } = require('../../controllers/admin/authController');
const { protect } = require('../../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
