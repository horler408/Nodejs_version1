const express = require('express');
const router = express.Router();

const {
  getNotes,
  createNote,
  getNote,
} = require('../controllers/notesController');
const { auth } = require('../../middleware/authMiddleware');

router.route('/').get(auth, getNotes);
router.route('/create').post(createNote);
router.route('/:id').get(getNote);
// .put().delete();

module.exports = router;
