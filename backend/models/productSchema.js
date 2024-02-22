const mongoose = require("mongoose")
const { Schema } = mongoose;


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    discountPercentage: {
        type: Number,
        min: [0, 'wrong min discount'],
        max: [99, 'wrong max discount'],
    },
    rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max rating'], default: 0 },
    thumbnailImage: {
        type: String,
        required: true,
    },
    productImages: {
        type: String,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);

module.exports = Product;