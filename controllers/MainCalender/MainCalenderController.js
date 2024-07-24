const asyncHandler = require("express-async-handler");
// const Company = require("../../models/Company/company");
const QualificationInfo = require("../../models/ITInfo/QualificationInfo/qualificationInfoModel");
const RecruitmentNoticeInfo = require("../../models/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel");
const StudentSupportInfo = require("../../models/ITInfo/StudentSupportInfo/studentSupportInfoModel");

/**
 * 모든 게시글 가져오기
 * GET /api/main
 */
const showAll = asyncHandler(async (req, res) => {
    try {
        // // Company 정보 전달------------------------------------------------------------
        // const companyData = await Company.findAll({
        //     attributes: ['companyID', 'companyName']
        // });
        
        // // Company 데이터에 'whatis' 속성을 추가
        // const modifiedCompanyData = companyData.map(company => ({
        //     ...company.toJSON(), // Sequelize 객체를 JSON 객체로 변환
        //     whatis: 'company'
        // }));

        // QualificationInfo 정보 전달----------------------------------------------------
        const qualificationData = await QualificationInfo.findAll({
            attributes: ['key', 'title', 'startdate', 'enddate']
        });

        // QualificationInfo 데이터에 'whatis' 속성을 추가
        const modifiedQualificationData = qualificationData.map(qualification => ({
            ...qualification.toJSON(), // Sequelize 객체를 JSON 객체로 변환
            whatis: 'qualification'
        }));

        // RecruitmentNoticeInfo 정보 전달-------------------------------------------------
        const recruitmentNoticeData = await RecruitmentNoticeInfo.findAll({
            attributes: ['key', 'title', 'startdate', 'enddate']
        });

        // RecruitmentNoticeInfo 데이터에 'whatis' 속성을 추가
        const modifiedRecruitmentNoticeData = recruitmentNoticeData.map(recruitmentNotice => ({
            ...recruitmentNotice.toJSON(),
            whatis: 'recruitmentNotice'
        }));

        // StudentSupportInfo 정보 전달----------------------------------------------------
        const studentSupportData = await StudentSupportInfo.findAll({
            attributes: ['key', 'title', 'startdate', 'enddate']
        });

        // StudentSupportInfo 데이터에 'whatis' 속성을 추가
        const modifiedStudentSupportData = studentSupportData.map(studentSupport => ({
            ...studentSupport.toJSON(),
            whatis: 'studentSupport'
        }));

        // 모든 데이터를 결합
        const combinedData = [
            // ...modifiedCompanyData,
            ...modifiedQualificationData,
            ...modifiedRecruitmentNoticeData,
            ...modifiedStudentSupportData
        ];

        res.status(200).json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

module.exports = { showAll };
