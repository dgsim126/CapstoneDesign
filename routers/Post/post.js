const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {verifyToken} = require('../../middleware/token');
const { 
    showAll, 
    showDetail, 
    createPost,  
    deletePost
} = require('../../controllers/Post/post');

// 모든 게시글 가져오기
router.get('/', asyncHandler(showAll));

// 게시글 상세 조회
router.get('/:postId', asyncHandler(showDetail));

// 게시글 내 게임시작
router.post('/:postId/game', asyncHandler());

// 게시글 작성
router.post('/create', verifyToken, asyncHandler(createPost));

// 게시글 삭제
router.delete('/delete/:postId', verifyToken, asyncHandler(deletePost));

module.exports = router;
