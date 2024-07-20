const asyncHandler = require('express-async-handler');
const Company = require('../../models/Company/company');

// GET api/company
// 모든 회사의 특정 정보
const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.findAll({
      attributes: ['companyID', 'companyName', 'establish', 'logo'] // companyID, 회사명, 설립일, 로고만 가져온다.
    });
    res.json(companies);
});

// GET api/company/:companyID
// 특정 회사의 모든 정보
const getCompanyById = asyncHandler(async (req, res) => {
    const { companyID } = req.params;
    const company = await Company.findByPk(companyID);
    if (!company) {
      return res.status(404).send('Company not found');
    }
    res.json(company);
});

module.exports = { getCompanies, getCompanyById };