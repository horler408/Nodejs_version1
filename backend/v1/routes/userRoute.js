const express = require('express');
const router = express.Router();

const auth = require('../../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/login', userController.authUser);
router.post('/', userController.registerUser);
router.post('/profile/:id', auth.protect, userController.updateUserProfile);

module.exports = router;
