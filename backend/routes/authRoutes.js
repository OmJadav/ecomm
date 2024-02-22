const express = require('express');
const { userSignup, userLogin } = require('../controllers/Auth');
const router = express.Router();


router.post("/signup", userSignup)
router.post("/login", userLogin)


exports.router = router;