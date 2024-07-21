const asyncHandler = require("express-async-handler");
const StudyBoard= require("../../models/StudyBoard/studyboard");
const StudyBoardComment = require("../../models/StudyBoard/studyboardComment"); // 댓글 모델 추가
// const bcrypt = require("bcrypt");

/**
 * 모든 게시글 가져오기
 * GET /api/admin/studyboard
 */
const showAll = asyncHandler(async (req, res) => {
    try {
        const data = await StudyBoard.findAll({
            include: [StudyBoardComment] // 별칭 없이 기본 관계 사용
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 에러." });
    }
});


/**
 * 게시글 삭제
 * DELETE /api/admin/studyboard/delete/:key
 */
const deletePost = asyncHandler(async (req, res) => {
    const { key } = req.params;

    try {
        // 댓글 삭제
        await StudyBoardComment.destroy({
            where: { studyboardkey: key }
        });

        // 게시글 삭제
        const deleteData = await StudyBoard.destroy({
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


/**
 * 특정 게시글 댓글 삭제
 * DELETE /api/admin/studyboard/delete/:studyboardkey/:commentkey
 */
const deleteComment = asyncHandler(async (req, res) => {
    const { studyboardkey, commentkey }= req.params;

    try{
        const comment= await StudyBoardComment.findOne({
            where:{
                commentkey: commentkey,
                studyboardkey: studyboardkey
            }
        });
        console.log(commentkey, studyboardkey);

        // 댓글이 없는 경우
        if(!comment){
            return res.status(404).json({ message: "Comment not found." });
        }

        // 댓글 삭제
        await comment.destroy();
        res.status(200).json({message: "comment deleted"});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the comment." });
    }
});
module.exports = { showAll, deletePost, deleteComment };