const asyncHandler = require("express-async-handler");
const FreeBoard= require("../../models/FreeBoard/freeboard");
const FreeBoardComment = require("../../models/FreeBoard/freeboardComment"); // 댓글 모델 추가
// const bcrypt = require("bcrypt");

/**
 * 모든 게시글 가져오기
 * GET /api/admin/freeboard
 */
const showAll = asyncHandler(async (req, res) => {
    try {
        const data = await FreeBoard.findAll({
            include: [FreeBoardComment] // 별칭 없이 기본 관계 사용
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 에러." });
    }
});


/**
 * 게시글 삭제
 * DELETE /api/admin/freeboard/delete/:key
 */
const deletePost = asyncHandler(async (req, res) => {
    const { key } = req.params;

    try {
        // 댓글 삭제
        await FreeBoardComment.destroy({
            where: { freeboardkey: key }
        });

        // 게시글 삭제
        const deleteData = await FreeBoard.destroy({
            where: { key }
        });

        if (deleteData === 0) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.status(200).json({ message: "Post and associated comments deleted successfully." });
    } catch (error) {
        // 서버 에러
        console.error('Error deleting post:', error);
        res.status(500).json({ message: "An error occurred while deleting the post and comments." });
    }
});

module.exports = { showAll, deletePost };