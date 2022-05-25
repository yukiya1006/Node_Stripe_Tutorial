const express = require('express');
const app = express();
const PORT = 3000;
const stripe = require('stripe')('sk_test_51L38ncGZTkvQE4e9LsIcM8OFQbClI2ZAtmbpP2n4ybhdNIJHzrigVk7bQ2astAJxqEdxVhumy9Gq00qqAeK4zP1l00U41zh1wQ');

const YOUR_DOMAIN = 'http://localhost:3000';

app.use(express.static('public'));

app.post('/create-checkout-session', async(req, res) => {
  try {
    const prices = await stripe.prices.list();
    // console.log(prices);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.redirect(303, session.url);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, console.log('サーバーが起動しました'));
