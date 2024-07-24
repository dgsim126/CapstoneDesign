// const asyncHandler = require("express-async-handler");
// const Company = require("../../models/Company/company");
// const QualificationInfo = require("../../models/ITInfo/QualificationInfo/qualificationInfoModel");
// const RecruitmentNoticeInfo = require("../../models/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel");
// const StudentSupportInfo = require("../../models/ITInfo/StudentSupportInfo/studentSupportInfoModel");

/**
 * 모든 게시글 가져오기
 * GET /api/my
 */
/**
 * 1. 현재 내 userID 쿠키로 받아올 것
 * 2. Scrap 테이블에서 해당 userID를 가지고 있는 모든 튜플을 불러옴
 * 
 * 3-1. 불러온 Scrap의 튜플 중 속성 studentSupportInfoKey에 값이 존재한다면, 
 *      연결된 StudentSupportInfo테이블에서의 key와 비교하여 studentSupportInfoKey==key가 성립하는 
 *      StudentSupportInfo테이블의 튜플의 key와 title, startdate, enddate을 가져옴. 
 *      가져온 데이터에 whatis 속성을 추가하여 key, title, whatis 속성을 json 배열에 포함.
 * 
 * 3-2  불러온 Scrap의 튜플 중 속성 qualificationInfoKey에 값이 존재한다면, 
 *      연결된 QualificationInfo테이블에서의 key와 비교하여 qualificationInfoKey==key가 성립하는 
 *      QualificationInfo테이블의 튜플의 key와 title, startdate, enddate을 가져옴.
 *      가져온 데이터에 whatis 속성을 추가하여 key, title, whatis 속성을 json 배열에 포함
 * 
 * 3-3  불러온 Scrap의 튜플 중 속성 recruitmentNoticeInfoKey에 값이 존재한다면, 
 *      연결된 RecruitmentNoticeInfo테이블에서의 key와 비교하여 recruitmentNoticeInfoKey==key가 성립하는 
 *      RecruitmentNoticeInfo테이블의 튜플의 key와 title, startdate, enddate을 가져옴. 
 *      가져온 데이터에 whatis 속성을 추가하여 key, title, whatis 속성을 json 배열에 포함
 * 
 * 테스트 방법: 회원가입, 로그인,      
 */

const asyncHandler = require("express-async-handler");
const Company = require("../../models/Company/company");
const QualificationInfo = require("../../models/ITInfo/QualificationInfo/qualificationInfoModel");
const RecruitmentNoticeInfo = require("../../models/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel");
const StudentSupportInfo = require("../../models/ITInfo/StudentSupportInfo/studentSupportInfoModel");
const Scrap = require("../../models/Scrap/scrap"); // Scrap 모델 추가

/**
 * 모든 게시글 가져오기
 * GET /api/my
 */
const showAll = asyncHandler(async (req, res) => {
    try {
        const userID = req.user.userID;

        // Scrap 테이블에서 해당 userID를 가지고 있는 모든 튜플을 불러옴
        const scraps = await Scrap.findAll({ where: { userID } });

        // 각 Scrap에 대한 데이터를 가져올 배열
        let combinedData = [];

        for (const scrap of scraps) {
            const { studentSupportInfoKey, qualificationInfoKey, recruitmentNoticeInfoKey } = scrap;

            // StudentSupportInfo 정보 가져오기
            if (studentSupportInfoKey) {
                const studentSupportInfo = await StudentSupportInfo.findOne({
                    where: { key: studentSupportInfoKey },
                    attributes: ['key', 'title', 'startdate', 'enddate']
                });
                if (studentSupportInfo) {
                    combinedData.push({
                        ...studentSupportInfo.toJSON(),
                        whatis: 'studentSupport'
                    });
                }
            }

            // QualificationInfo 정보 가져오기
            if (qualificationInfoKey) {
                const qualificationInfo = await QualificationInfo.findOne({
                    where: { key: qualificationInfoKey },
                    attributes: ['key', 'title', 'startdate', 'enddate']
                });
                if (qualificationInfo) {
                    combinedData.push({
                        ...qualificationInfo.toJSON(),
                        whatis: 'qualification'
                    });
                }
            }

            // RecruitmentNoticeInfo 정보 가져오기
            if (recruitmentNoticeInfoKey) {
                const recruitmentNoticeInfo = await RecruitmentNoticeInfo.findOne({
                    where: { key: recruitmentNoticeInfoKey },
                    attributes: ['key', 'title', 'startdate', 'enddate']
                });
                if (recruitmentNoticeInfo) {
                    combinedData.push({
                        ...recruitmentNoticeInfo.toJSON(),
                        whatis: 'recruitmentNotice'
                    });
                }
            }
        }

        res.status(200).json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

module.exports = { showAll };
