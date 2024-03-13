const User = require("../models/userSchema");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userfound = await User.findOne({ email: email })
        const validPassword = userfound ? bcryptjs.compareSync(password, userfound.password) : false;
        if (userfound && validPassword) {
            const response = { name: userfound.name, email: userfound.email, _id: userfound._id }
            res.status(201).json({ user: response, message: "User Logged in" })
        } else {
            const emailFound = await User.findOne({ email: email });
            if (!emailFound) {
                return res.status(400).json({ error: "User not Exists." });
            } else {
                return res.status(400).json({ error: "Incorrect Password" });
            }
        }

    } catch (error) {
        res.status(400).json({ error: "Something went wrong!" })
    }
}
exports.userSignup = async (req, res) => {
    const { name, email, password, addresses } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const already = await User.findOne({ email: email });
        if (already) {
            res.status(400).json({ error: "User Already exists" })
        } else {
            const newuser = new User({ name, email, password: hashedPassword, addresses });
            await newuser.save()
            res.status(201).json({ message: "Sign up Successful", token: await newuser.generateToken(), userID: newuser._id.toString(), })

        }
    } catch (error) {
        res.status(400).json({ error: "Signup Error..." })
    }
}