const express = require('express');
const router = express.Router();
const { fetchBrands } = require('../controllers/Brand');

router.get('/fetch-brands', fetchBrands)

exports.router = router;