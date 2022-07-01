const express = require('express');
const router = express.Router();

const authorization = require('../../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:_id', userController.getUser);
router.post('/login', userController.authUser);
router.post('/', userController.registerUser);
router.post('/:_id', authorization.auth, userController.updateUserProfile);
router.post('/delete/:_id', userController.deleteUser);

module.exports = router;
