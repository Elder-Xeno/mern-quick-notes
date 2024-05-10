import { useState, useEffect } from 'react';
import { fetchNotes, createNote  } from '../../utilities/notes-service';
import Card from '../../components/Card/Card';
import './NotesPage.css';

export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        loadNotes();
    }, []);

    const handleDeleteNote = (deletedNoteId) => {
      setNotes(notes.filter(note => note._id !== deletedNoteId));
  };

    const loadNotes = async () => {
        const notesData = await fetchNotes();
        setNotes(notesData);
    };

    const handleAddNote = async () => {
        if (newNote.trim() === '') {
            alert('Please enter a note.');
            return;
        }

        const createdNote = await createNote(newNote);
        setNotes([...notes, createdNote]);
        setNewNote('');
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const getToggleButtonText = () => {
        return sortOrder === 'asc' ? 'New Notes First' : 'Old Notes First';
    };

    const sortedNotes = [...notes].sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    return (
        <div className="NotesPage">
        <h1>My Notes</h1>
        <div className="input-container">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your new note..."
          />
        </div>
        <div className="button-container">
          <button onClick={handleAddNote}>Add Note</button>
          <button onClick={toggleSortOrder}>{getToggleButtonText()}</button>
        </div>
        <div className="card-container">
          {sortedNotes.length === 0 ? (
            <p>No Notes Yet!</p>
          ) : (
            sortedNotes.map((note) => <Card key={note._id} note={note} onDelete={handleDeleteNote} />)
          )}
        </div>
      </div>
      
  );
}
