const router = require('express').Router();

const upload = require('../../middleware/multer');
const { auth } = require('../../middleware/authMiddleware');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', auth, upload, createProduct);
router.put('/:id', auth, upload, updateProduct);
router.delete('/delete/:id', auth, deleteProduct);

module.exports = router;
