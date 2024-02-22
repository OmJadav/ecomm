const Brand = require("../models/brandSchema");

exports.fetchBrands = async (req, res) => {
    try {
        const brands = await Brand.find({})
        res.send(brands);
    } catch (error) {
        res.status(404).json({ error: "Fetching Brands Error..." })
    }
}

