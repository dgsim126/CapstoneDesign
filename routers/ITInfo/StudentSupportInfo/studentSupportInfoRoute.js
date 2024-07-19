// StudentSupportInfo 라우트코드
const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
    test
} = require('../../../controllers/ITInfo/StudentSupportInfo/studentSupportInfoController');

// test
router.get('/', test);


module.exports = router;