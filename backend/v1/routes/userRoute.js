const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/authMiddleware');

const {
  getUsers,
  getUser,
  authUser,
  registerUser,
  updateUserProfile,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:_id', getUser);
router.post('/login', authUser);
router.post('/', registerUser);
router.post('/profile', auth, updateUserProfile);
router.post('/delete/:_id', deleteUser);

module.exports = router;
