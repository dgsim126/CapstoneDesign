const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { 
    showAll,
    deletePost,
    deleteComment
} = require('../../controllers/admin/freeboardAdminController');

// const verifyToken = require('../middleware/token');

// 모든 게시글 가져오기
router.get('/', showAll);

// 게시글 삭제
router.delete('/delete/:key', asyncHandler(deletePost));

// 댓글 삭제
router.delete('/delete/:freeboardkey/:commentkey', asyncHandler(deleteComment));

module.exports = router;