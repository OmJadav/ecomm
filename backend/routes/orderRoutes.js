const express = require("express");
const { createOrder, fetchOrdersByUser } = require("../controllers/Order");
const router = express.Router();

router.post('/neworder', createOrder)
router.get('/user-orders/:id', fetchOrdersByUser)

exports.router = router;