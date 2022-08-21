const router = require('express').Router();

const { getOrders, checkout } = require('../controllers/orderController');

router.get('/order/:id', getOrders);
router.post('/order/:id', checkout);

module.exports = router;
