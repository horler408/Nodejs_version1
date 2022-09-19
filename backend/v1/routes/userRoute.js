const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/authMiddleware');
// const upload = require('../../middleware/multer');

const {
  getUsers,
  getUser,
  authUser,
  registerUser,
  updateUserProfile,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/profile', auth, updateUserProfile);
router.post('/delete/:id', auth, deleteUser);

module.exports = router;
