// StudentSupportInfo 라우트코드
const express = require('express');
const router = express.Router();
const {
    showAllList,
    showDetailInfo,
    createInfoAdmin
} = require('../../../controllers/ITInfo/StudentSupportInfo/studentSupportInfoController');

// 모든 목록 가져오기 [학생지원] - GET /api/studentSupportInfo
router.get('/', showAllList);

// 정보글 상세 조회 [학생지원] - GET /api/studentSupportInfo/:key
router.get('/:key', showDetailInfo);


// ⭐ 정보글 관리자가 직접 작성 [학생지원] - POST /api/studentSupportInfo/admin
router.post('/admin', createInfoAdmin);


module.exports = router;