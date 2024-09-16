const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post");
const { sequelize } = require('../../config/db'); // Sequelize 인스턴스 가져오기
const { Op } = require('sequelize');

/**
 * 모든 게시글 가져오기
 * GET /api
 */
const showAll = asyncHandler(async (req, res) => {
    try {
        const data = await Post.findAll();

        res.status(200).json(convertedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

/**
 * 게시글 상세 조회
 * GET /api/:post_key
 */
const showDetail = asyncHandler(async (req, res) => {
    const { key } = req.params;
    try {
        const data = await Post.findByPk(key);
        if (!data) {
            res.status(404).json({ message: "게시글을 찾을 수 없음." });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 에러." });
    }
});

/**
 * 게시글 내 게임시작
 * POST /api/:post_key/game
 */


/**
 * 게시글 작성 
 * POST /api/create
 */
const createPost = asyncHandler(async (req, res) => {
    const { title, body, pic1, pic2 } = req.body;
    const id = req.user.email;

    try {
        // Base64 문자열을 바이너리 데이터로 변환
        const pic1Data = pic1 ? base64ToBinary(pic1) : null;
        const pic2Data = pic2 ? base64ToBinary(pic2) : null;

        const newData = await FreeBoard.create({
            id,
            title,
            body,
            pic1: pic1Data ? pic1Data.binaryData : null,
            pic2: pic2Data ? pic2Data.binaryData : null
        });
        res.status(201).json(newData);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "게시글 작성 중 오류." });
    }
});


/**
 * 게시글 삭제
 * DELETE /api/delete/:post_key
 */
const deletePost = asyncHandler(async (req, res) => {
    const { key } = req.params;
    const id = req.user.email;  // 쿠키로부터일걸?

    try {
        // 삭제하려는 게시글 찾기
        const post = await Post.findOne({
            where: { key }
        });

        // 게시글이 없는 경우
        if (!post) {
            return res.status(404).json({ message: "수정할 게시글을 찾을 수 없음." });
        }

        // 게시글 작성자와 현재 사용자가 다른 경우
        if (post.id !== id) {
            return res.status(403).json({ message: "수정 권한이 없음." });
        }

        // 연결된 댓글 모두 삭제
        await FreeBoardComment.destroy({
            where: { freeboardkey: key }
        });

        // 게시글 삭제
        await post.destroy();
        res.status(200).json({ message: "삭제 완료." });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: "서버 에러." });
    }
});

module.exports = { showAll, showDetail, createPost, deletePost };
