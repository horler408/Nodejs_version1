const mongoose = require('mongoose');
const router = require('express').Router();

const Order = require('../../models/orderModel');
const Product = require('../../models/productModel');

router.get('/', (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .exec()
    .then((orders) => {
      res.status(200).json({
        docs: orders.map((order) => {
          return {
            count: orders.length,
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
            request: {
              type: 'GET',
              url: 'http://localhost:5000/api/v1/orders/' + order._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Creating new Order
router.post('/', (req, res, next) => {
  const { quantity, productId } = req.body;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          msg: 'Product not found!',
        });
      } else {
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity,
          product: productId,
        });
        return order.save();
      }
    })
    .then((result) => {
      res.status(201).json({
        msg: 'Order made successfully!',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: 'GET',
          url: 'http://localhost:5000/api/v1/orders/' + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then((order) => {
      if (!order) {
        res.status(404).json({
          msg: 'Order not found!',
        });
      } else {
        res.status(200).json({
          order,
          request: {
            type: 'GET',
            url: 'http://5000/api/v1/orders',
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Order.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((response) => {
      if (!response) {
        res.status(404).json({ msg: 'Order not found or already deleted' });
      } else {
        res.status(200).json({
          msg: 'Order deleted successfully!',
          request: {
            type: 'GET',
            url: 'http://localhost:5000/api/v1/orders/',
            body: {
              productId: 'ID',
              quantity: 'Number',
            },
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
