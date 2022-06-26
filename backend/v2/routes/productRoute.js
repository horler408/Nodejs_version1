const router = require('express').Router();

const productController = require('../controllers/productController');

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.removeProduct);

module.exports = router;
