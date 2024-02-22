const mongoose = require("mongoose")
const { Schema } = mongoose;



const categorySchema = new mongoose.Schema({
    name: { type: String, default: "routine" },
    checked: { type: Boolean, default: false },
}, { timestamps: true })

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;