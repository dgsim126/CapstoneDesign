const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
// const verifyToken = require('../../middleware/token');
const { showAll } = require('../../controllers/MainCalender/MainCalenderController');

// 모든 게시글 가져오기
router.get('/', asyncHandler(showAll));

module.exports = router;