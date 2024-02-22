const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET)

function discountedPrice(productPrice, discountPercentage) {
    let discountedPrice = Math.floor(productPrice - (productPrice * (discountPercentage / 100)))
    return discountedPrice;
}

router.post('/create-checkout-session', async (req, res) => {
    const products = req.body.products
    // console.log(products);
    const lineItems = products.map((product) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: product.product.title,
                images: [product.product.thumbnail]
            },
            unit_amount: discountedPrice(product.product.price, product.product.discountPercentage) * 100,
        },
        quantity: product.quantity,
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: 'payment',
        success_url: `https://buyit-eight.vercel.app/`,
        cancel_url: 'https://buyit-eight.vercel.app/',
    });

    res.json({ id: session.id })
});
exports.router = router;
