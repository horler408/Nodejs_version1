const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel.js');

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    if (carts) res.json(carts);
    else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Error occured!',
    });
  }
};

const getCartItems = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.json(cart);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};

const addCartItem = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).json('Item not found!');
    }
    const price = item.price;
    const name = item.name;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};

const deleteCartItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json('Something went wrong');
  }
};

module.exports = { getCarts, getCartItems, addCartItem, deleteCartItem };
