// RecruitmentNoticeInfo 컨트롤러
const asyncHandler = require("express-async-handler");
const RecruitmentNoticeInfo = require("../../../models/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel");

/**
 * 모든 목록 가져오기 [채용공고]
 * GET /api/recruitmentNoticeInfo
 */
const showAllList = asyncHandler(async (req, res) => {
    try {
        const recruitmentNoticeInfos = await RecruitmentNoticeInfo.findAll({
            // 10개에 대한 정보들만 뽑아서 가져옴
            attributes: ['title', 'body', 'experience', 'education', 'location',
                         'work_type', 'companyname', 'startdate', 'enddate', 'pic1']
        });
        res.status(200).json(recruitmentNoticeInfos);
    } catch (error) {
        console.error('Error fetching recruitment notice info:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * 정보글 상세 조회 [채용공고]
 * GET /api/recruitmentNoticeInfo/:key
 */
const showDetailInfo = asyncHandler(async (req, res) => {
    const { key } = req.params;
    
    try {
        const recruitmentNoticeInfo = await RecruitmentNoticeInfo.findOne({
            where: { key }
        });
        if (!recruitmentNoticeInfo) {
            res.status(404).json({ message: 'Recruitment Notice Info not found' });
            return;
        }
        res.json(recruitmentNoticeInfo);
    } catch (error) {
        console.error('Error fetching recruitment notice info:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * ⭐ 정보글 관리자가 직접 작성 [채용공고]
 * POST /api/recruitmentNoticeInfo/admin
 */
const createInfoAdmin = asyncHandler(async (req, res) => {
    const {
        title,
        startdate,
        enddate,
        resultdate,
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        body,
        experience,
        education,
        stack,
        qualification,
        preferences,
        work_type,
        salary,
        location,
        work_time,
        recruit_part,
        duties,
        key_skills,
        recruit_num,
        link,
        companyname
    } = req.body;

    try {
        const newRecruitmentNoticeInfo = await RecruitmentNoticeInfo.create({
            title,
            startdate,
            enddate,
            resultdate,
            pic1,
            pic2,
            pic3,
            pic4,
            pic5,
            body,
            experience,
            education,
            stack,
            qualification,
            preferences,
            work_type,
            salary,
            location,
            work_time,
            recruit_part,
            duties,
            key_skills,
            recruit_num,
            link,
            companyname
        });

        res.status(201).json(newRecruitmentNoticeInfo);
    } catch (error) {
        console.error('Error creating new recruitment notice info:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { showAllList, showDetailInfo, createInfoAdmin };