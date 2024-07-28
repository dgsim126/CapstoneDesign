const asyncHandler = require('express-async-handler');
const { sequelize } = require('../../config/db');
const Company = require('../../models/Company/company');
const Scrap = require('../../models/Scrap/scrap');
const { Op } = require('sequelize');

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

// POST api/company/admin
// ⭐관리자 - 기업 목록 추가
const createCompany = asyncHandler(async (req, res) => {
    const {
        companyName,
        establish,
        logo,
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        body,
        track,
        stack,
        welfare,
        salary,
        location,
        employee,
        link,
        revenue
    } = req.body;

    // 필수 필드 체크
    if (!companyName || !body) {
        return res.status(400).json({ message: 'Company name and body are required' });
    }

    // 새로운 회사 데이터 생성
    const newCompany = await Company.create({
        companyName,
        establish,
        logo,
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        body,
        track,
        stack,
        welfare,
        salary,
        location,
        employee,
        link,
        revenue
    });

    res.status(201).json(newCompany);
});

// DELETE api/company/admin/:companyID
// ⭐관리자 - 기업 목록 삭제
const deleteCompany = asyncHandler(async (req, res) => {
    const { companyID } = req.params;

    const company = await Company.findByPk(companyID);
    if (!company) {
        return res.status(404).json({ message: 'Company not found' });
    }

    await Scrap.destroy({ where: { companyID: companyID } });
    await company.destroy();
    
    res.status(204).send(); // No Content
});

/**
 * 회사이름으로 게시글 검색
 * POST /api/company/search
 */
const searchByCompanyName = asyncHandler(async (req, res) => {
    const { companyName } = req.body; // 요청 본문에서 제목을 가져옴

    if (!companyName) {
        return res.status(400).json({ message: "검색어가 필요합니다." });
    }

    try {
        const posts = await Company.findAll({
            where: {
                companyName: {
                    [Op.like]: `%${companyName}%` // 제목에 검색어가 포함된 게시글 찾기
                }
            }
        });

        if (posts.length === 0) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error searching posts by title:', error);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});

module.exports = { getCompanies, getCompanyById, scrapCompany, deleteScrap, createCompany, deleteCompany, searchByCompanyName };