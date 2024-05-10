const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');


router.get('/', notesCtrl.getNotes);

router.post('/', notesCtrl.createNote);

router.delete('/:id', notesCtrl.deleteNote);

// router.put('/:id', notesCtrl.updateNote);

module.exports = router;