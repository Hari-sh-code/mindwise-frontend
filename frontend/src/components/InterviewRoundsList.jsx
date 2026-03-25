import React from 'react';

const InterviewRoundsList = ({ rounds }) => {
  if (!rounds || rounds.length === 0) {
    return <p className="text-gray-400 mt-6">No interview rounds recorded.</p>;
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'Medium':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'Hard':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'Very Hard':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      default:
        return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
    }
  };

  const getResultColor = (result) => {
    return result === 'Pass'
      ? 'bg-green-500/10 border-green-500/30 text-green-400'
      : 'bg-red-500/10 border-red-500/30 text-red-400';
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 mt-6">
      <h3 className="text-lg font-bold text-white mb-4">Interview Rounds Details</h3>
      <div className="space-y-4">
        {rounds.map((round) => (
          <div
            key={round.id || round.round_number}
            className="bg-dark border border-dark-border rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400">Round {round.round_number}</div>
                <div className="text-lg font-semibold text-white">{round.type}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getResultColor(round.result)}`}>
                {round.result}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-400 mb-1">Topics</div>
                <div className="text-sm text-gray-300">{round.topics}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Difficulty</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(round.difficulty)}`}>
                  {round.difficulty}
                </div>
              </div>
            </div>

            {round.notes && (
              <div>
                <div className="text-xs text-gray-400 mb-1">Notes</div>
                <div className="text-sm text-gray-300 bg-dark-border rounded px-2 py-1 mt-1">
                  {round.notes}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewRoundsList;
