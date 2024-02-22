const User = require("../models/userSchema");


exports.updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}
exports.fetchUserById = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        const user = await User.findById(id);
        res.status(200).json({ id: user.id, addresses: user.addresses, email: user.email, isAdmin: user.isAdmin });
    } catch (err) {
        res.status(400).json(err);
    }
};