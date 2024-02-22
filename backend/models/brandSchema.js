const mongoose = require("mongoose")
const { Schema } = mongoose;



const brandSchema = new mongoose.Schema({
    name: { type: String, default: "BuyIt" },
    checked: { type: Boolean, default: false },
}, { timestamps: true })

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;