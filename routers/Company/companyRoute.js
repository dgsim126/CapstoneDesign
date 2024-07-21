const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyById, scrapCompany, deleteScrap, createCompany } = require('../../controllers/Company/companyController');
const verifyToken = require('../../middleware/token');

// GET api/company
router.get('/', getCompanies);

// GET api/company/:companyID
router.get('/:companyID', getCompanyById)

// POST /api/company/:companyID/scrap
router.post('/:companyID/scrap', verifyToken, scrapCompany);

// DELETE api/company/:companyID/scrap
router.delete('/:companyID/scrap', verifyToken, deleteScrap);

// POST api/company/admin
router.post('/admin', createCompany);

module.exports = router;