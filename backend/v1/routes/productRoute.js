const router = require('express').Router();

const productController = require('../controllers/productController.js');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/:id', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
