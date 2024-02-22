const express = require('express');
const router = express.Router();
const { fetchCategories } = require('../controllers/Category');

router.get('/fetch-categories', fetchCategories)

exports.router = router;