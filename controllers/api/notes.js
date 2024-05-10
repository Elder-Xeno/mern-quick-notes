const Note = require('../../models/note');

module.exports = {
    getNotes,
    createNote,
    deleteNote,
};

async function getNotes(req, res) {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  }

async function createNote(req, res) {
    const note = await Note.create({ text: req.body.text, user: req.user._id });
    res.status(201).json(note);
  }

async function deleteNote(req, res) {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Successfully deleted note' });
}