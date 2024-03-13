const { fetchFilteredProducts, fetchProductById, fetchAllProduct, addProducts, updateProduct } = require("../controllers/Product");
const express = require('express');
const router = express.Router();


router.get('/all-products', fetchAllProduct)
router.post('/filtered-products', fetchFilteredProducts)
router.post('/add-product', addProducts)
router.get('/product/:productId', fetchProductById)
router.post('/update-product/:id', updateProduct)

exports.router = router;

// router.get("/fetch-brands", async (req, res) => {
//     try {
//         const brands = await Brand.find({})
//         res.send(brands);
//     } catch (error) {
//         res.status(404).json({ error: "Fetching Brands Error..." })
//     }
// })


// module.exports = router;