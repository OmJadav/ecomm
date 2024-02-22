const express = require("express");
const { updateUser, fetchUserById } = require("../controllers/User");
const router = express.Router();

router.get('/own/:id', fetchUserById)
router.patch('/:id', updateUser);

exports.router = router;
