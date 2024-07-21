// StudentSupportInfo 컨트롤러
const asyncHandler = require("express-async-handler");
const StudentSupportInfo = require("../../../models/ITInfo/StudentSupportInfo/studentSupportInfoModel");

/**
 * 모든 목록 가져오기 [학생지원]
 * GET /api/studentSupportInfo
 */
const showAllList = asyncHandler(async (req, res) => {
    try {
        const studentSupportInfos = await StudentSupportInfo.findAll({
            // 6개에 대한 정보들만 뽑아서 가져옴
            attributes: ['title', 'body', 'agency', 'startdate', 'enddate', 'pic1']
        });
        res.status(200).json(studentSupportInfos); // 201은 잘 만들어졌을때의 응답
    } catch (error) {
        console.error('Error fetching student support info:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * 정보글 상세 조회 [학생지원]
 * GET /api/studentSupportInfo/:key
 */
const showDetailInfo = asyncHandler(async (req, res) => {
    const { key } = req.params;
    
    try {
        const studentSupportInfo = await StudentSupportInfo.findOne({
            where: { key }
        });
        if (!studentSupportInfo) {
            res.status(404).json({ message: 'Student Support Info not found' });
            return;
        }
        res.json(studentSupportInfo);
    } catch (error) {
        console.error('Error fetching student support info:', error);
        res.status(500).send('Internal Server Error');
    }
});


/**
 * ⭐ 정보글 관리자가 직접 작성 [학생지원]
 * POST /api/studentSupportInfo/admin
 */
const createInfoAdmin = asyncHandler(async (req, res) => {
    const {
        title,
        startdate,
        enddate,
        resultdate,
        logo,
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        body,
        support_target,
        application_method,
        qualification,
        support_detail,
        link,
        agency
    } = req.body;

    try {
        const newStudentSupportInfo = await StudentSupportInfo.create({
            title,
            startdate,
            enddate,
            resultdate,
            logo,
            pic1,
            pic2,
            pic3,
            pic4,
            pic5,
            body,
            support_target,
            application_method,
            qualification,
            support_detail,
            link,
            agency
        });

        res.status(201).json(newStudentSupportInfo);
    } catch (error) {
        console.error('Error creating new student support info:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { showAllList, showDetailInfo, createInfoAdmin };