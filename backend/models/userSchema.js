const mongoose = require("mongoose")
const { Schema } = mongoose;



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    addresses: { type: [Schema.Types.Mixed] },

}, { timestamps: true })




const User = mongoose.model("User", userSchema);

module.exports = User;