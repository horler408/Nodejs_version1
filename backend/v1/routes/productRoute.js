const router = require('express').Router();

const Category = require('../../models/categoryModel.js');
const Product = require('../../models/productModel.js');
const productController = require('../controllers/productController.js');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
