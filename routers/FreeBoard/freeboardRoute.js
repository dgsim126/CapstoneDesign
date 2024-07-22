const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { 
    showAll, 
    showDetail, 
    createPost,  
    updatePost, 
    deletePost 
} = require('../../controllers/FreeBoard/freeboardController');

// const verifyToken = require('../middleware/token');

// 모든 게시글 가져오기
router.get('/', showAll);

// 게시글 상세 조회
router.get('/:key', asyncHandler(showDetail));

// 게시글 작성 내용을 DB에 넣기
router.post('/create', asyncHandler(createPost));

// 게시글 수정 내용을 DB에 넣기
router.put('/update/:key', asyncHandler(updatePost));

// 게시글 삭제
router.delete('/delete/:key', asyncHandler(deletePost));


module.exports = router;