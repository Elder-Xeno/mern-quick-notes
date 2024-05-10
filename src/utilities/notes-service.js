import sendRequest from './send-request';

const BASE_URL = '/api/notes';

export async function fetchNotes() {
    try {
        return await sendRequest(BASE_URL);
    } catch (error) {
        throw new Error('Failed to fetch notes');
    }
}

export async function createNote(text, userId) {
    try {
        return await sendRequest(BASE_URL, 'POST', { text });
    } catch (error) {
        throw new Error('Failed to create note');
    }
}

export async function deleteNote(noteId) {
    try {
        return await sendRequest(`${BASE_URL}/${noteId}`, 'DELETE');
    } catch (error) {
        throw new Error('Failed to delete note');
    }
}