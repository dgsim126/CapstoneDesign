// StudentSupportInfo 컨트롤러
const asyncHandler = require("express-async-handler");

const test = (req, res) => {
    try{
        res.send("test complete :)");
    } catch(error) {
        console.error(error);
        res.status(500);
    }
}

/**
 * 모든 목록 가져오기 [학생지원]
 * GET /api/studentSupportInfo
 */
// const showAllList = asyncHandler(async (req, res) => {
//     
// });

/**
 * 정보글 상세 조회 [학생지원]
 * GET /api/studentSupportInfo/:key
 */
// const showDetailInfo = asyncHandler(async (req, res) => {
//     
// });

module.exports = { test }; // 나중에 showAllList, showDetailInfo 추가