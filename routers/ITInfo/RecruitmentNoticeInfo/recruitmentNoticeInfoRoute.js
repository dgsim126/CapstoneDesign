// RecruitmentNoticeInfo 라우트코드
const express = require('express');
const router = express.Router();
const {
    test
} = require('../../../controllers/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoController');

// test
router.get('/', test);

// 모든 목록 가져오기
// router.get('/', showAllList);

// 정보글 상세 조회
// router.get('/:key', asyncHandler(showDetailInfo));


module.exports = router;