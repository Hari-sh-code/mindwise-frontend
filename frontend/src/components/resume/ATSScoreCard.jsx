import React from 'react';

const ATSScoreCard = ({ score }) => {
  // If score is null or undefined, default to 0 for rendering purposes
  const finalScore = score != null ? score : 0;

  const getScoreColor = (val) => {
    if (val >= 80) return 'text-green-400';
    if (val >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (val) => {
    if (val >= 80) return 'bg-green-400';
    if (val >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (val) => {
    if (val >= 80) return 'Strong';
    if (val >= 60) return 'Good';
    return 'Poor';
  };

  const scoreColorClass = getScoreColor(finalScore);
  const scoreLabel = getScoreLabel(finalScore);

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-lg w-full">
      {/* ATS Score Circular Progress */}
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[#111822]">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-800"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className={scoreColorClass}
              strokeDasharray={`${finalScore}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-xl font-bold leading-none ${scoreColorClass}`}>{finalScore.toFixed(0)}</span>
          </div>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">
             ATS Score <span className={`text-sm font-normal ml-2 px-2 py-0.5 rounded-full bg-opacity-20 ${scoreColorClass} ${getScoreBg(finalScore).replace('bg-', 'bg-').replace('-500', '-900').replace('-400', '-900')}`}>{scoreLabel}</span>
          </h3>
          <p className="text-xs text-gray-400">Match based on Job Description</p>
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;
