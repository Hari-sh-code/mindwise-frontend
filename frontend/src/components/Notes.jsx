import { useState, useEffect } from 'react';
import { notesAPI } from '../api/api';
import toast from 'react-hot-toast';
import Loader from './Loader';

const Notes = ({ jobId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadNotes();
  }, [jobId]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getAll(jobId);
      // Handle both array and object responses
      const notesData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.notes || []);
      setNotes(notesData);
    } catch (error) {
      console.error('Failed to load notes:', error);
      toast.error('Failed to load notes');
      setNotes([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSubmitting(true);
    try {
      const response = await notesAPI.create(jobId, newNote.trim());
      setNotes([response.data, ...notes]);
      setNewNote('');
      toast.success('Note added');
    } catch (error) {
      console.error('Failed to add note:', error);
      toast.error('Failed to add note');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesAPI.delete(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      toast.success('Note deleted');
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error('Failed to delete note');
    }
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Personal Notes</h3>
      <p className="text-gray-400 text-sm mb-4">
        Add your personal notes here. These are private and never shared with AI.
      </p>

      <form onSubmit={handleAddNote} className="mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="w-full bg-dark-lighter border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows="3"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={!newNote.trim() || submitting}
          className="mt-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {submitting && <Loader size="sm" />}
          <span>{submitting ? 'Adding...' : 'Add Note'}</span>
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No notes yet. Add your first note above.
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-dark-lighter border border-dark-border rounded-lg p-4 group"
            >
              <div className="flex justify-between items-start">
                <p className="text-gray-300 flex-1">{note.content}</p>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="ml-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete note"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {new Date(note.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
