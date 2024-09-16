const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../../controllers/User/profileController');
const { verifyToken } = require('../../middleware/token');

// GET /api/my
router.get('/', verifyToken, getProfile);

// PUT /api/profile/edit
router.put('/edit', verifyToken, updateProfile);

module.exports = router;