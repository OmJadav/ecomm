const Catogory = require("../models/categorySchema");

exports.fetchCategories = async (req, res) => {
    try {
        const catogories = await Catogory.find({})
        res.send(catogories);
    } catch (error) {
        res.status(404).json({ error: "Fetching Categories Error..." })
    }
}

