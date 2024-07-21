const asyncHandler = require('express-async-handler');
const { sequelize } = require('../../config/db');
const Company = require('../../models/Company/company');
const Scrap = require('../../models/Scrap/scrap');

// GET api/company
// 모든 회사의 특정 정보 (스크랩 인수 포함)
const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.findAll({
        attributes: [
            'companyID', 
            'companyName', 
            'establish', 
            'logo', 
            [sequelize.fn('COUNT', sequelize.col('Scraps.companyID')), 'scrapCount']
        ],
        include: [{
            model: Scrap,
            attributes: []
        }],
        group: ['Company.companyID'],
    });
    res.json(companies);
});

// GET api/company/:companyID
// 특정 회사의 모든 정보 (스크랩 인수 포함)
const getCompanyById = asyncHandler(async (req, res) => {
    const { companyID } = req.params;
    const company = await Company.findByPk(companyID, {
        include: [{
            model: Scrap,
            attributes: []
        }],
        attributes: {
            include: [
                [sequelize.fn('COUNT',sequelize.col('Scraps.companyID')), 'scrapCount']
            ]
        },
        group: ['Company.companyID']
    });
    if (!company) {
      return res.status(404).send('Company not found');
    }
    res.json(company);
});

// POST /api/company/:companyID/scrap
// 관심 회사 스크랩
const scrapCompany = asyncHandler(async (req, res) => {
    const userID = req.user.userID; // 로그인된 유저 ID 가져오기
    const { companyID } = req.params;

    // 스크랩 중복 체크
    const existingScrap = await Scrap.findOne({
        where: {
            userID,
            companyID
        }
    });
    if (existingScrap) {
        return res.status(400).json({ message: 'Already scrapped this company' });
    }
    // 스크랩 생성
    await Scrap.create({
        userID,
        companyID
    });

    res.status(201).json({ message: 'Company scrapped successfully' });
});

// DELETE api/company/:companyID/scrap
// 스크랩 삭제
const deleteScrap = asyncHandler(async (req, res) => {
    const { companyID } = req.params;
    const userID = req.user.userID;

    const scrap = await Scrap.findOne({
        where: {
            companyID,
            userID
        }
    });

    if (!scrap) {
        return res.status(404).send('Scrap not found');
    }

    await scrap.destroy();
    res.status(200).send('Scrap deleted successfully');
});

module.exports = { getCompanies, getCompanyById, scrapCompany, deleteScrap };