const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { 
    showAll, 
    showDetail, 
    renderCreatePost, 
    createPost,  
    renderUpdatePost, 
    updatePost, 
    deletePost 
} = require('../../controllers/FreeBoard/freeboardController');

// const verifyToken = require('../middleware/token');

// 모든 게시글 가져오기
router.get('/freeboard', showAll);

// 게시글 상세 조회
router.get('/freeboard/:key', asyncHandler(showDetail));

// 게시글 작성 (작성 페이지로 접근하기 위한)
router.get('/freeboard/create', asyncHandler(renderCreatePost));

// 게시글 작성 내용을 DB에 넣기
router.post('/freeboard/create', asyncHandler(createPost));

// 게시글 수정(수정 페이지로 접근하기 위한)
router.post('/freeboard/update', asyncHandler(renderUpdatePost));

// 게시글 수정 내용을 DB에 넣기
router.post('/freeboard/update/:key', asyncHandler(updatePost));

// 게시글 삭제
router.post('/freeboard/delete/:key', asyncHandler(deletePost));


module.exports = router;