const asyncHandler = require("express-async-handler");
const FreeBoard= require("../../models/FreeBoard/freeboard");
// const bcrypt = require("bcrypt");

/**
 * 모든 게시글 가져오기
 * GET /api/admin/freeboard
 */
const showAll = asyncHandler(async (req, res) => {
    try{
        const data= await FreeBoard.findAll();
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500);
    }
});


/**
 * 게시글 삭제
 * DELETE /api/admin/freeboard/delete/:key
 */
const deletePost = asyncHandler(async (req, res) => {
    const { key } = req.params;

    try{
        const deleteData= await FreeBoard.destroy({
            where: { key }
        });
        if(deleteData === 0){
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json({ message: "Post deleted successfully." });
    }catch(error){
        // 서버 에러
        console.error('Error deleting post:', error);
        res.status(500).json({ message: "An error occurred while deleting the post." });
    }
    
});

module.exports = { showAll, deletePost };