
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");

exports.fetchOrdersByUser = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const orders = await Order.find({ user: id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.createOrder = async (req, res) => {
    try {
        const newOrder = req.body;
        const order = new Order(newOrder);

        for (let item of order.items) {
            const product = await Product.findOne({ _id: item.product._id });

            if (!product) {
                return res.status(400).json({ error: 'Product not found' });
            }

            if (item.quantity > product.stock) {
                return res.status(400).json({ error: 'Out Of Stock' });
            }

            await product.updateOne({ $inc: { stock: -item.quantity } });
        }

        const doc = await order.save();
        const user = await User.findById(order.user);
        res.status(201).json({ order: doc, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating order' });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting order' });
    }
};

exports.updateOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating order' });
    }
};

exports.fetchAllOrders = async (req, res) => {
    let query = Order.find({ deleted: { $ne: true } });
    let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

    if (req.query._sort && req.query._order) {
        totalOrdersQuery = totalOrdersQuery.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalOrdersQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    try {
        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(docs);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error fetching orders' });
    }
};













// const Order = require("../models/orderSchema")
// const Product = require("../models/productSchema");
// const User = require("../models/userSchema");

// exports.createOrder = async (req, res) => {
//     const order = new Order(req.body);
//     for (let item of order.items) {
//         let product = await Product.findOne({ _id: item.product.id })
//         product.$inc('stock', -1 * item.quantity);
//         await product.save()
//     }
//     try {
//         const doc = await order.save();
//         const user = await User.findById(order.user)
//         res.status(201).json(doc);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

// exports.deleteOrder = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const order = await Order.findByIdAndDelete(id);
//         res.status(200).json(order);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };

// exports.updateOrder = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const order = await Order.findByIdAndUpdate(id, req.body, {
//             new: true,
//         });
//         res.status(200).json(order);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };

// exports.fetchAllOrders = async (req, res) => {
//     let query = Order.find({ deleted: { $ne: true } });
//     let totalOrdersQuery = Order.find({ deleted: { $ne: true } });


//     if (req.query._sort && req.query._order) {
//         query = query.sort({ [req.query._sort]: req.query._order });
//     }

//     const totalDocs = await totalOrdersQuery.count().exec();
//     console.log({ totalDocs });

//     if (req.query._page && req.query._limit) {
//         const pageSize = req.query._limit;
//         const page = req.query._page;
//         query = query.skip(pageSize * (page - 1)).limit(pageSize);
//     }

//     try {
//         const docs = await query.exec();
//         res.set('X-Total-Count', totalDocs);
//         res.status(200).json(docs);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// };


// part -2

// const Order = require("../models/orderSchema");
// const Product = require("../models/productSchema");
// const User = require("../models/userSchema");

// exports.createOrder = async (req, res) => {
//     const newOrder = req.body
//     console.log(newOrder);
//     const order = new Order(newOrder);

//     for (let item of order.items) {
//         const productUpdate = await Product.findOneAndUpdate(
//             { _id: item.product.id, stock: { $gte: item.quantity } },
//             { $inc: { stock: -item.quantity } },
//             { new: true }
//         );

//         if (!productUpdate) {
//             return res.status(400).json({ error: 'Insufficient stock for the product' });
//         }
//     }

//     try {
//         const doc = await order.save();
//         const user = await User.findById(order.user);
//         res.status(201).json({ order: doc, user });
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({ error: 'Error creating order' });
//     }
// };

// exports.deleteOrder = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const order = await Order.findByIdAndDelete(id);

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.status(200).json(order);
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({ error: 'Error deleting order' });
//     }
// };

// exports.updateOrder = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const order = await Order.findByIdAndUpdate(id, req.body, {
//             new: true,
//         });

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.status(200).json(order);
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({ error: 'Error updating order' });
//     }
// };

// exports.fetchAllOrders = async (req, res) => {
//     let query = Order.find({ deleted: { $ne: true } });
//     let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

//     if (req.query._sort && req.query._order) {
//         totalOrdersQuery = totalOrdersQuery.sort({ [req.query._sort]: req.query._order });
//     }

//     const totalDocs = await totalOrdersQuery.countDocuments().exec();

//     if (req.query._page && req.query._limit) {
//         const pageSize = req.query._limit;
//         const page = req.query._page;
//         query = query.skip(pageSize * (page - 1)).limit(pageSize);
//     }

//     try {
//         const docs = await query.exec();
//         res.set('X-Total-Count', totalDocs);
//         res.status(200).json(docs);
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({ error: 'Error fetching orders' });
//     }
// };

// part-3
