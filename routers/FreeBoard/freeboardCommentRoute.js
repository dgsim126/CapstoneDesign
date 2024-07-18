const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { 
    showAll,
    createComment,
    deleteComment
} = require('../../controllers/FreeBoard/freeboardCommentController');

// const verifyToken = require('../middleware/token');

// 특정 게시글 댓글 전체 가져오기
router.get('/:freeboardkey', showAll);

// 특정 게시글 댓글 생성
router.post('/create/:freeboardkey', asyncHandler(createComment));

// 특정 게시글 댓글 삭제
router.delete('/delete/:freeboardkey/:commentkey', asyncHandler(deleteComment));


module.exports = router;