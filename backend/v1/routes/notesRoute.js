const express = require('express');
const router = express.Router();

const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');
const { auth } = require('../../middleware/authMiddleware');

router.route('/').get(getNotes);
router.route('/create').post(auth, createNote);
router
  .route('/:id')
  .get(getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

module.exports = router;
