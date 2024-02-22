const dotenv = require("dotenv")
dotenv.config()
const process = require("process")
const express = require("express");
const mongoose = require("mongoose");
const compression = require('compression');
const app = express();
const productRouter = require("./routes/productRoutes")
const categoriesRouter = require('./routes/categoriesRoutes');
const brandRouter = require('./routes/brandRoutes');
const authRouter = require("./routes/authRoutes")
const cartRouter = require("./routes/cartRoutes")
const userRouter = require("./routes/userRoutes")
const orderRouter = require("./routes/orderRoutes")
const stripeRouter = require("./routes/stripeCheckoutRoutes")
const path = require('path');
let cors = require("cors")

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(compression());
app.use(cors())
app.use(express.json())
// app.use(productRouter)


app.use('/products', productRouter.router)
app.use('/categories', categoriesRouter.router);
app.use('/brands', brandRouter.router);
app.use('/auth', authRouter.router);
app.use('/cart', cartRouter.router);
app.use('/user', userRouter.router);
app.use('/order', orderRouter.router);
app.use('/stripe', stripeRouter.router);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is Running On port ${process.env.PORT}...🔥`);
})


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connection Successfully..✅")
}).catch((error) => {
    console.log("MongoDB connection Failed..❌", error)
})