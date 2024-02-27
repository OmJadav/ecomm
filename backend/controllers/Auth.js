const User = require("../models/userSchema");


exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userfound = await User.findOne({ email: email, password: password })

        if (userfound) {
            const response = { name: userfound.name, email: userfound.email, _id: userfound._id }
            res.status(201).json({ user: response, message: "User Logged in" })
        } else {
            const emailFound = await User.findOne({ email: email });

            if (emailFound) {
                return res.status(400).json({ error: "Incorrect Password. Try again" });
            } else {
                return res.status(400).json({ error: "User not found" });
            }
        }

    } catch (error) {
        res.status(400).json({ error: "Login Error..." })
    }
}
exports.userSignup = async (req, res) => {
    const { name, email, password, addresses } = req.body

    try {
        const already = await User.findOne({ email: email });
        if (already) {
            res.status(400).json({ error: "User Already exists" })
        } else {
            const newuser = new User({ name, email, password, addresses });
            await newuser.save()
            res.status(201).json({ message: "Sign up Successful" })

        }
    } catch (error) {
        res.status(400).json({ error: "Signup Error..." })
    }
}