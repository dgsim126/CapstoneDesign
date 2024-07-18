const asyncHandler = require("express-async-handler");
const FreeboardComment= require("../../models/FreeBoard/freeboardComment");
// const bcrypt = require("bcrypt");

/**
 * 특정 게시글 댓글 전체 가져오기
 * GET /api/freeboardComment/:freeboardkey
 */
const showAll = asyncHandler(async (req, res) => {
    const { freeboardkey } = req.params;

    try{
        const data= await FreeboardComment.findAll({
            where: { freeboardkey },
            raw: true // 순수한 json 객체로 반환
        })
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500);
    }

});

/**
 * 특정 게시글 댓글 생성
 * POST /api/freeboardComment/create/:freeboardkey
 */
const createComment = asyncHandler(async (req, res) => {
    const { freeboardkey } = req.params;
    const { id, comment } = req.body; // id값은 쿠키를 통해 받아오도록 수정할 것

    try{
        const newData= await FreeboardComment.create({
            id,
            comment,
            freeboardkey
        })
        res.status(201).json(newData);
    }catch(error){
        res.status(500);
    }
});

/**
 * 특정 게시글 댓글 삭제
 * DELETE /api/freeboardComment/delete/:freeboardkey/:commentkey
 */
const deleteComment = asyncHandler(async (req, res) => {
    const { freeboardkey, commentkey }= req.params;
    const { id }= req.body; // id값은 쿠키를 통해 받아오도록 수정할 것
    
    try{
        const comment= await FreeboardComment.findOne({
            where:{
                commentkey: commentkey,
                freeboardkey: freeboardkey
            }
        });

        // 댓글이 없는 경우
        if(!comment){
            return res.status(404).json({ message: "Comment not found." });
        }

        // 댓글 작성자와 현재 사용자가 다른 경우
        if(comment.id!==id){
            return res.status(403).json({ message: "You do not have permission to delete this comment." });
        }

        // 댓글 삭제
        await comment.destroy();
        res.status(200).json({message: "comment deleted"});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the comment." });
    }
});


module.exports = { showAll, createComment, deleteComment };