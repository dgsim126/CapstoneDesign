const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyById, scrapCompany, deleteScrap } = require('../../controllers/Company/companyController');
const verifyToken = require('../../middleware/token');

router.get('/', getCompanies);
router.get('/:companyID', getCompanyById)
router.post('/:companyID/scrap', verifyToken, scrapCompany);
router.delete('/:companyID/scrap', verifyToken, deleteScrap);

module.exports = router;