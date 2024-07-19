const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { 
    showAll,
    deletePost
} = require('../../controllers/admin/studyboardAdminController');

// const verifyToken = require('../middleware/token');

// 모든 게시글 가져오기
router.get('/', showAll);

// 게시글 삭제
router.delete('/delete/:key', asyncHandler(deletePost));

module.exports = router;