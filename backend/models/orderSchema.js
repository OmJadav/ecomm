const mongoose = require("mongoose")
const { Schema } = mongoose;


const orderSchema = new mongoose.Schema({
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'pending' },

}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;