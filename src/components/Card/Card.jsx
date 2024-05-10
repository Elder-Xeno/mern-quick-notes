import './Card.css';
import { deleteNote } from '../../utilities/notes-service';

export default function Card({ note, onDelete }) {
    const handleDelete = async () => {
        try {
            await deleteNote(note._id);
            onDelete(note._id);
        } catch (error) {
            console.error('Failed to delete note:', error.message);
        }
    };

    return (
        <div className="card">
            <button
                style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    fontSize: '16px',
                    padding: '1px 1px',
                    backgroundColor: 'transparent',
                    border: '1px solid #49148a',
                    borderRadius: '20%',
                    cursor: 'pointer',
                }}
                onClick={handleDelete}
            >
                ❌
            </button>
            <div className="card-body">
                <h5 className="card-title">{note.text}</h5>
                <p className="card-text">Created at: {new Date(note.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}

