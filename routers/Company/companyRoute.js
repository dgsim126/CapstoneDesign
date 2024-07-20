const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyById } = require('../../controllers/Company/companyController');

router.get('/', getCompanies);
router.get('/:companyID', getCompanyById)

module.exports = router;