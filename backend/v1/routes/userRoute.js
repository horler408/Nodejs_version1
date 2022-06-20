const express = require('express');
const router = express.Router();

const auth = require('../../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:_id', userController.getUser);
router.post('/login', userController.authUser);
router.post('/', userController.registerUser);
router.post('/:_id', auth.protect, userController.updateUserProfile);
router.post('/delete/:_id', userController.deleteUser);

module.exports = router;
