import {
  INTERVIEW_ROUND_TYPES,
  INTERVIEW_DIFFICULTY_LEVELS,
  INTERVIEW_RESULT_OPTIONS,
} from '../utils/constants';

const InterviewRoundForm = ({ round, roundIndex, onRoundChange, onRemove }) => {
  const handleChange = (field, value) => {
    onRoundChange(roundIndex, { ...round, [field]: value });
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-white">Round {roundIndex + 1}</h4>
        {roundIndex > 0 && (
          <button
            onClick={() => onRemove(roundIndex)}
            className="text-red-400 hover:text-red-300 text-sm font-medium"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Interview Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Interview Type *
          </label>
          <select
            value={round.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 bg-dark border border-dark-border rounded-md text-white focus:outline-none focus:border-primary"
          >
            <option value="">Select type</option>
            {INTERVIEW_ROUND_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Difficulty *
          </label>
          <select
            value={round.difficulty || ''}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 bg-dark border border-dark-border rounded-md text-white focus:outline-none focus:border-primary"
          >
            <option value="">Select difficulty</option>
            {INTERVIEW_DIFFICULTY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Topics Asked */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Topics Asked *
          </label>
          <input
            type="text"
            value={round.topics || ''}
            onChange={(e) => handleChange('topics', e.target.value)}
            placeholder="e.g., Arrays, Dynamic Programming, Sorting"
            className="w-full px-3 py-2 bg-dark border border-dark-border rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Result */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Result *
          </label>
          <div className="flex gap-4">
            {INTERVIEW_RESULT_OPTIONS.map((option) => (
              <label key={option} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`result-${roundIndex}`}
                  value={option}
                  checked={round.result === option}
                  onChange={(e) => handleChange('result', e.target.value)}
                  className="w-4 h-4 text-primary border-gray-300 cursor-pointer"
                />
                <span className="ml-2 text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Notes
          </label>
          <textarea
            value={round.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Add any additional notes about this round..."
            rows="3"
            className="w-full px-3 py-2 bg-dark border border-dark-border rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewRoundForm;
