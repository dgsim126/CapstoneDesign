// const asyncHandler = require('express-async-handler');
// const { Sequelize } = require('../../config/db');
// const RecruitmentNoticeInfo = require("../../models/ITInfo/RecruitmentNoticeInfo/recruitmentNoticeInfoModel");
// const Studyboard = require('../../models/StudyBoard/studyboard');
// const Scrap = require('../../models/Scrap/scrap');


// /**
//  * 1. Scrap에서 recruitmentNoticeInfoKey 해당 키를 가지고 있는 튜플의 recruitmentNoticeInfoKey 가져온다.
//  * 2. RecruitmentNoticeInfo 해당 테이블의 튜플의 속성 중 key의 값을 가져오고 그것을 Scrap 테이블의 recruitmentNoticeInfoKey키와 동일한 경우의 
//  *    RecruitmentNoticeInfo 튜플 값만 저장
//  * 3. 
//  */

// const getMainContent = asyncHandler(async (req, res) => {
//     // 스크랩 많은 채용 공고 순으로 10개
//     const topRecruitments = await RecruitmentNoticeInfo.findAll({
//         include: [{
//             model: Scrap,
//             attributes: [] // 속성 추가 필요 시 여기 수정
//         }],
//         attributes: [
//             'key',
//             'title',
//             [Sequelize.fn('COUNT', Sequelize.col('Scrap.recruitmentNoticeInfoKey')), 'scrapCount'] // 모델 이름과 컬럼명을 일치시킴
//         ],
//         group: ['RecruitmentNoticeInfoModel.key'], // 또는 'key'
//         order: [[Sequelize.fn('COUNT', Sequelize.col('Scrap.recruitmentNoticeInfoKey')), 'DESC']],
//         limit: 10
//     });

//     // 스터디보드 테이블의 최신 글 3개
//     const latestStudyboardPosts = await Studyboard.findAll({
//         attributes: ['key', 'title', 'id', 'date'],
//         order: [['date', 'DESC']],
//         limit: 3
//     });

//     res.status(200).json({
//         success: true,
//         data: {
//             topRecruitments,
//             latestStudyboardPosts
//         }
//     });
// });

// module.exports = { getMainContent };