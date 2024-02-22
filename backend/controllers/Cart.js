const Cart = require("../models/cartSchema")

exports.addToCart = async (req, res) => {
    const newItem = req.body;
    // console.log(newItem);

    try {
        const cart = new Cart(newItem)
        const doc = await cart.save();
        // const result = await doc.populate('product')
        const result = await doc.populate('product')
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.fetchCartByUser = async (req, res) => {
    // const { userId } = req.userId;
    const userId = req.query.userId;
    // console.log(userId);
    try {
        const cartItems = await Cart.find({ user: userId }).populate('product');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(400).json(err);
    }
}

// exports.updateCart = async (req, res) => {
//     const { id } = req.params;
//     const { quantity } = req.body;
//     console.log(req.body);
//     try {
//         const cart = await Cart.findByIdAndUpdate(id, req.body, {
//             new: true,
//         });
//         const result = await cart.populate('product');

//         res.status(200).json(result);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };

exports.updateCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            {
                new: true,
            }
        );

        const result = await cart.populate('product');

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Cart.findByIdAndDelete(id);
        res.send(result);
    } catch (err) {
        res.status(400).json(err);
    }
}