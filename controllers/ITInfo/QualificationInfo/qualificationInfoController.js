// QualificationInfo 컨트롤러
const asyncHandler = require("express-async-handler");
const QualificationInfo = require("../../../models/ITInfo/QualificationInfo/qualificationInfoModel");

/**
 * 모든 목록 가져오기 [자격증]
 * GET /api/qualificationInfo
 */
const showAllList = asyncHandler(async (req, res) => {
    try {
        const qualificationInfos = await QualificationInfo.findAll({
            // 6개에 대한 정보들만 뽑아서 가져옴
            attributes: ['title', 'body', 'agency', 'startdate', 'enddate', 'pic1']
        });
        res.status(200).json(qualificationInfos);
    } catch (error) {
        console.error('Error fetching qualification info:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * 정보글 상세 조회 [자격증]
 * GET /api/qualificationInfo/:key
 */
const showDetailInfo = asyncHandler(async (req, res) => {
    const { key } = req.params;
    
    try {
        const qualificationInfo = await QualificationInfo.findOne({
            where: { key }
        });
        if (!qualificationInfo) {
            res.status(404).json({ message: 'Qualification Info not found' });
            return;
        }
        res.json(qualificationInfo);
    } catch (error) {
        console.error('Error fetching qualification info:', error);
        res.status(500).send('Internal Server Error');
    }
});


/**
 * ⭐ 정보글 관리자가 직접 작성 [자격증]
 * POST /api/qualificationInfo/admin
 */
const createInfoAdmin = asyncHandler(async (req, res) => {
    const {
        title,
        startdate,
        enddate,
        exam_startdate,
        exam_enddate,
        resultdate,
        logo,
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        body,
        pass_standard,
        workview,
        qualification,
        testinfo,
        problems,
        qualification_name,
        relate_department,
        agency,
        link,
        fee
    } = req.body;

    try {
        const newQualificationInfo = await QualificationInfo.create({
            title,
            startdate,
            enddate,
            exam_startdate,
            exam_enddate,
            resultdate,
            logo,
            pic1,
            pic2,
            pic3,
            pic4,
            pic5,
            body,
            pass_standard,
            workview,
            qualification,
            testinfo,
            problems,
            qualification_name,
            relate_department,
            agency,
            link,
            fee
        });

        res.status(201).json(newQualificationInfo);
    } catch (error) {
        console.error('Error creating new qualification info:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { showAllList, showDetailInfo, createInfoAdmin };