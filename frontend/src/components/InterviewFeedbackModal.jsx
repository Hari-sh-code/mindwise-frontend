import { useState } from 'react';
import toast from 'react-hot-toast';
import InterviewRoundForm from './InterviewRoundForm';
import { interviewFeedbackAPI } from '../api/api';

const InterviewFeedbackModal = ({ isOpen, onClose, jobId, onFeedbackSaved }) => {
  const [totalRounds, setTotalRounds] = useState('');
  const [roundsPassed, setRoundsPassed] = useState('');
  const [rounds, setRounds] = useState([
    {
      round_number: 1,
      type: '',
      topics: '',
      difficulty: '',
      result: '',
      notes: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleRoundChange = (index, updatedRound) => {
    const newRounds = [...rounds];
    newRounds[index] = updatedRound;
    setRounds(newRounds);
  };

  const handleRemoveRound = (index) => {
    const newRounds = rounds.filter((_, i) => i !== index);
    // Update round numbers
    newRounds.forEach((round, idx) => {
      round.round_number = idx + 1;
    });
    setRounds(newRounds);
  };

  const handleAddRound = () => {
    const newRound = {
      round_number: rounds.length + 1,
      type: '',
      topics: '',
      difficulty: '',
      result: '',
      notes: '',
    };
    setRounds([...rounds, newRound]);
  };

  const validateForm = () => {
    if (!totalRounds || totalRounds < 1) {
      toast.error('Total rounds must be at least 1');
      return false;
    }

    if (roundsPassed === '' || roundsPassed < 0 || roundsPassed > totalRounds) {
      toast.error('Rounds passed must be between 0 and total rounds');
      return false;
    }

    if (rounds.length === 0) {
      toast.error('Please add at least one round');
      return false;
    }

    for (let round of rounds) {
      if (!round.type) {
        toast.error(`Round ${round.round_number}: Interview type is required`);
        return false;
      }
      if (!round.difficulty) {
        toast.error(`Round ${round.round_number}: Difficulty is required`);
        return false;
      }
      if (!round.topics) {
        toast.error(`Round ${round.round_number}: Topics are required`);
        return false;
      }
      if (!round.result) {
        toast.error(`Round ${round.round_number}: Result is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const feedbackData = {
        total_rounds: parseInt(totalRounds),
        rounds_passed: parseInt(roundsPassed),
        rounds: rounds.map((round) => ({
          round_number: round.round_number,
          type: round.type,
          topics: round.topics,
          difficulty: round.difficulty,
          result: round.result,
          notes: round.notes || '',
        })),
      };

      await interviewFeedbackAPI.submit(jobId, feedbackData);
      toast.success('Interview feedback saved successfully!');

      // Reset form
      setTotalRounds('');
      setRoundsPassed('');
      setRounds([
        {
          round_number: 1,
          type: '',
          topics: '',
          difficulty: '',
          result: '',
          notes: '',
        },
      ]);

      onFeedbackSaved();
      onClose();
    } catch (error) {
      console.error('Error saving interview feedback:', error);
      toast.error(error.response?.data?.detail || 'Failed to save interview feedback');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-dark-border">
          <h2 className="text-2xl font-bold text-white">Interview Feedback</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Interview Rounds *
              </label>
              <input
                type="number"
                value={totalRounds}
                onChange={(e) => setTotalRounds(e.target.value)}
                min="1"
                required
                className="w-full px-3 py-2 bg-dark border border-dark-border rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rounds Passed *
              </label>
              <input
                type="number"
                value={roundsPassed}
                onChange={(e) => setRoundsPassed(e.target.value)}
                min="0"
                required
                className="w-full px-3 py-2 bg-dark border border-dark-border rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Rounds Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Interview Rounds</h3>
            {rounds.map((round, index) => (
              <InterviewRoundForm
                key={index}
                round={round}
                roundIndex={index}
                onRoundChange={handleRoundChange}
                onRemove={handleRemoveRound}
              />
            ))}

            <button
              type="button"
              onClick={handleAddRound}
              className="w-full px-4 py-2 bg-dark-border hover:bg-dark-border/80 text-primary font-medium rounded-lg transition-colors mb-6"
            >
              + Add Another Round
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-dark-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-dark-border hover:bg-dark-border/80 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Interview Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewFeedbackModal;
