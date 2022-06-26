const router = require('express').Router();

const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.removeCategory);

module.exports = router;
