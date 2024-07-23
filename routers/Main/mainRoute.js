const express = require('express');
const router = express.Router();
const { getMainContent } = require('../../controllers/Main/mainController');

router.get('/main', getMainContent);

module.exports = router;