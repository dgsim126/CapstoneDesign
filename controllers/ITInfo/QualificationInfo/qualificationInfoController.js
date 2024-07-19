// QualificationInfo 컨트롤러
const asyncHandler = require("express-async-handler");
const QualificationInfo = require("../../../models/ITInfo/QualificationInfo/qualificationInfoModel");

const test = (req, res) => {
    try{
        res.send("test complete :):)");
    } catch(error) {
        console.error(error);
        res.status(500);
    }
}

/**
 * 모든 목록 가져오기 [자격증]
 * GET /api/qualificationInfo
 */
// const showAllList = asyncHandler(async (req, res) => {
//     
// });

/**
 * 정보글 상세 조회 [자격증]
 * GET /api/qualificationInfo/:key
 */
// const showDetailInfo = asyncHandler(async (req, res) => {
//     
// });

module.exports = { test }; // 나중에 showAllList, showDetailInfo 추가