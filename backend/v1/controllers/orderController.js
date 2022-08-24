const Order = require('../../models/orderModel');
const Cart = require('../../models/cartModel');
const User = require('../../models/userModel');

// const stripe = require('stripe')(config.get('StripeAPIKey'));

const getOrders = async (req, res) => {
  const userId = req.params.id;
  Order.find({ userId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
};

const checkout = async (req, res) => {
  try {
    const userId = req.params.id;
    const { source } = req.body;
    let cart = await Cart.findOne({ userId });
    let user = await User.findOne({ _id: userId });
    const email = user.email;
    if (cart) {
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: 'NGN',
        source: source,
        receipt_email: email,
      });
      if (!charge) throw Error('Payment failed');
      if (charge) {
        const order = await Order.create({
          userId,
          items: cart.items,
          bill: cart.bill,
        });
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        return res.status(201).send(order);
      }
    } else {
      res.status(500).send('You do not have items in cart');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports = { getOrders, checkout };
