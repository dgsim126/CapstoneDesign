const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { 
    showAll,
    createComment,
    deleteComment
} = require('../../controllers/StudyBoard/studyboardCommentController');

// const verifyToken = require('../middleware/token');

// 특정 게시글 댓글 전체 가져오기
router.get('/:studyboardkey', showAll);

// 특정 게시글 댓글 생성
router.post('/create/:studyboardkey', asyncHandler(createComment));

// 특정 게시글 댓글 삭제
router.delete('/delete/:studyboardkey/:commentkey', asyncHandler(deleteComment));


module.exports = router;