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

router.route('/').get(auth, getNotes);
router.route('/').post(auth, createNote);
router
  .route('/:id')
  .get(getNote)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

module.exports = router;
