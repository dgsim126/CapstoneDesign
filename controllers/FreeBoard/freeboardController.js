const asyncHandler = require("express-async-handler");
const FreeBoard= require("../../models/FreeBoard/freeboard");
const FreeBoardComment = require("../../models/FreeBoard/freeboardComment"); // 댓글 모델 추가
const { sequelize } = require('../../config/db'); // Sequelize 인스턴스 가져오기
// const bcrypt = require("bcrypt");

/**
 * 모든 게시글 가져오기 (댓글 수 포함)
 * GET /api/freeboard
 */
const showAll = asyncHandler(async (req, res) => {
    try {
        // 모든 게시글을 가져오면서 댓글 수를 계산하여 포함
        const data = await FreeBoard.findAll({
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('FreeBoardComments.commentKey')), 'commentCount']
                ]
            },
            include: [
                {
                    model: FreeBoardComment,
                    attributes: [] // 댓글의 세부정보를 포함하지 않음
                }
            ],
            group: ['FreeBoard.key'] // group by 게시글의 key
        });

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

/**
 * 게시글 상세 조회
 * GET /api/freeboard/:key
 */
const showDetail = asyncHandler(async (req, res) => {
    const { key } = req.params;
    try{
        const data= await FreeBoard.findByPk(key);
        if(!data){
            res.status(404);
            return;
        }
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500);
    }
});

/**
 * 게시글 작성 내용을 DB에 넣기
 * POST /api/freeboard/create
 */
const createPost = asyncHandler(async (req, res) => {
    const { title, body, pic1, pic2 }= req.body;
    // const id= "user123"; // id값은 쿠키를 통해 받아오도록 수정할 것
    const id= req.user.email;

    try{
        const newData= await FreeBoard.create({
            id,
            title,
            body,
            pic1,
            pic2
        })
        res.status(201).json(newData);
    }catch(error){
        console.error("Error creating post:", error);
        res.status(500).json({ message: "게시글 작성 중 오류." });
    }
});

/**
 * 게시글 수정 내용을 DB에 넣기
 * PUT /api/freeboard/update/:key
 */
const updatePost = asyncHandler(async (req, res) => {
    const { key } = req.params;
    const { title, body, pic1, pic2 }= req.body;
    // const id= "user123";
    const id= req.user.email;

    try{
        // 수정할 게시글 찾기
        const post= await FreeBoard.findByPk(key);

        if(!post){
            return res.status(404).json({message: "수정할 게시글을 찾을 수 없음."});
        }

        if(post.id!==id){
            return res.status(403).json({ message: "수정 권한이 없음." });
        }

        // 게시글 수정
        const updateData= await FreeBoard.update({
            title,
            body,
            pic1,
            pic2
        },{
            where: { key }
        });

        // 수정된 데이터 다시 불러오기
        const afterUpdated= await FreeBoard.findByPk(key);
        res.status(200).json(afterUpdated);
    }catch(error){
        res.status(500);
    }
});

/**
 * 게시글 삭제
 * DELETE /api/freeboard/delete/:key
 */
const deletePost = asyncHandler(async (req, res) => {
    const { key } = req.params;
    // const id = "user123"; // 현재 로그인한 사용자의 ID
    const id= req.user.email;

    try {
        // 삭제하려는 게시글 찾기
        const post = await FreeBoard.findOne({
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

        // ----- 추가된 부분 -----
        // 연결된 댓글 모두 삭제
        await FreeBoardComment.destroy({
            where: { freeboardkey: key }
        });
        // ----- 추가된 부분 끝 -----

        // 게시글 삭제
        await post.destroy();
        res.status(200).json({ message: "삭제 완료." });
    } catch (error) {
        // 서버 에러
        console.error('Error deleting post:', error);
        res.status(500).json({ message: "서버 에러." });
    }
});

module.exports = { showAll, showDetail, createPost, updatePost, deletePost };