const router = require('express').Router();

const {
  getCarts,
  getCartItems,
  addCartItem,
  deleteCartItem,
} = require('../controllers/cartController');

router.get('/', getCarts);
router.get('/:id', getCartItems);
router.post('/:id', addCartItem);
router.delete('/:userId/:itemId', deleteCartItem);

module.exports = router;
