const router = require('express').Router();

const upload = require('../../middleware/multer');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', upload, createProduct);
router.patch('/:id', upload, updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
