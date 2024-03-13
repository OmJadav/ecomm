const mongoose = require("mongoose")
const { Schema } = mongoose;
const jwt = require("jsonwebtoken")


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


userSchema.methods.generateToken = function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })
    } catch (error) {
        console.error(error);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;