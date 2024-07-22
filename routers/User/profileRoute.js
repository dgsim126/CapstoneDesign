const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require('../../controllers/User/profileController');

const verifyToken = require('../../middleware/token');

router.get('/', verifyToken, getProfile);
router.put('/edit', verifyToken, updateProfile);
router.delete('/', verifyToken, deleteProfile);

module.exports = router;