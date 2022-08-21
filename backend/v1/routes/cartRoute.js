const router = require('express').Router();

const {
  getCarts,
  getCartItems,
  addCartItem,
  deleteCartItem,
} = require('../controllers/cartController');

router.get('/carts', getCarts);
router.get('/cart/:id', getCartItems);
router.post('/cart/:id', addCartItem);
router.delete('/cart/:userId/:itemId', deleteCartItem);

module.exports = router;
