const asyncHandler = require("express-async-handler");
const User = require('../../models/FreeBoard/freeboard');
const bcrypt = require("bcrypt");

// GET /api/freeboard - 모든 게시글 가져오기
const showAll = asyncHandler(async (req, res) => {
    
});

// GET /api/freeboard/:key - 게시글 상세 조회
const showDetail = asyncHandler(async (req, res) => {
    
});

// GET /api/freeboard/create - 게시글 작성 (작성 페이지로 접근하기 위한)
const renderCreatePost = asyncHandler(async (req, res) => {
    
});

// POST /api/freeboard/create - 게시글 작성 내용을 DB에 넣기
const createPost = asyncHandler(async (req, res) => {
    
});

// GET /api/freeboard/update - 게시글 수정 (수정 페이지로 접근하기 위한)
const renderUpdatePost = asyncHandler(async (req, res) => {
    
});

// PUT /api/freeboard/update/:key - 게시글 수정 내용을 DB에 넣기
const updatePost = asyncHandler(async (req, res) => {
    
});

// DELETE /api/freeboard/delete/:key - 게시글 삭제
const deletePost = asyncHandler(async (req, res) => {
   
});

module.exports = { showAll, showDetail, renderCreatePost, createPost, renderUpdatePost, updatePost, deletePost };