const express = require("express");
const router = express.Router();
const { addToCart, fetchCartByUser, updateCart, deleteFromCart } = require("../controllers/Cart");


router.post("/addToCart", addToCart)
router.get("/get-cart-by-user", fetchCartByUser)
router.post('/updatecart/:id', updateCart)
router.delete('/delete-cart-item/:id', deleteFromCart)

exports.router = router;