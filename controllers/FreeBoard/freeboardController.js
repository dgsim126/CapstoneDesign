const asyncHandler = require("express-async-handler");
const FreeBoard= require("../../models/FreeBoard/freeboard");
// const bcrypt = require("bcrypt");

/**
 * 모든 게시글 가져오기
 * GET /api/freeboard
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
    const { id, title, body, pic1, pic2 }= req.body;
    // id값은 쿠키를 통해 받아오도록 수정할 것
    try{
        const newData= await FreeBoard.create({
            id,
            title,
            body,
            pic1,
            pic2
        })
        res.status(201).json(newData);
        // 새로 생성된 레코드를 JSON 형태로 반환 (기본키와 기본값 포함)
        // res.status(201).json(newPost.toJSON());
    }catch(error){
        res.status(500);
    }
});

/**
 * 게시글 수정 내용을 DB에 넣기
 * PUT /api/freeboard/update/:key
 */
const updatePost = asyncHandler(async (req, res) => {
    const { key } = req.params;
    const { title, body, pic1, pic2 }= req.body;

    try{
        const updateData= await FreeBoard.update({
            title,
            body,
            pic1,
            pic2
        },{
            where: { key }
        });

        if(updateData[0]===0){
            res.status(404).json({message: "수정할 게시글을 찾을 수 없음"});
        }

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

    try{
        const deleteData= await FreeBoard.destroy({
            where: { key }
        });
        if(deleteDate === 0){
            res.status(400).json({message: "No data"});
            return;
        }
        res.status(200);
    }catch(error){
        res.status(500);
    }
    
});

module.exports = { showAll, showDetail, createPost, updatePost, deletePost };