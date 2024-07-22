// QualificationInfo 라우트코드
const express = require('express');
const router = express.Router();
const {
    showAllList,
    showDetailInfo,
    createInfoAdmin
} = require('../../../controllers/ITInfo/QualificationInfo/qualificationInfoController');

// 모든 목록 가져오기 [자격증] - GET /api/qualificationInfo
router.get('/', showAllList);

// 정보글 상세 조회 [자격증] - GET /api/qualificationInfo/:key
router.get('/:key', showDetailInfo);


// ⭐ 정보글 관리자가 직접 작성 [자격증] - POST /api/qualificationInfo/admin
router.post('/admin', createInfoAdmin);


module.exports = router;