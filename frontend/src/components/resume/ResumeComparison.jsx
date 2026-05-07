import React from 'react';

const ResumeComparison = ({ data, onClear }) => {
  if (!data) return null;

  const {
    ats_improvement,
    old_version,
    new_version
  } = data;

  const getImprovementTheme = (val) => {
    if (val > 0) return { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-500/30', icon: 'M5 10l7-7m0 0l7 7m-7-7v18' };
    if (val < 0) return { bg: 'bg-red-900/30', text: 'text-red-500', border: 'border-red-500/30', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3' };
    return { bg: 'bg-gray-800', text: 'text-gray-400', border: 'border-gray-700', icon: 'M5 12h14' };
  };

  const atsTheme = getImprovementTheme(ats_improvement?.improvement || 0);

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 shadow-lg animate-fade-in relative h-full">
      <button 
        onClick={onClear}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white bg-dark-border hover:bg-gray-700 rounded-full transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Compare Versions</h2>
        <p className="text-gray-400 text-sm mt-1">Comparing Version {old_version} with Version {new_version}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* ATS Score Comparison */}
        <div className="bg-[#111822] border border-gray-800 rounded-xl p-5">
            <h3 className="text-gray-400 font-medium mb-4 text-sm uppercase tracking-wider">ATS Score</h3>
            <div className="flex items-center justify-between">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-300">{ats_improvement?.old_score?.toFixed(0) || 0}</div>
                    <div className="text-xs text-gray-500 mt-1">Version {old_version}</div>
                </div>
                
                <div className={`flex flex-col items-center px-4 py-2 border rounded-xl ${atsTheme.bg} ${atsTheme.border} ${atsTheme.text}`}>
                    <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={atsTheme.icon} />
                    </svg>
                    <span className="font-bold text-lg">{ats_improvement?.improvement > 0 ? '+' : ''}{ats_improvement?.improvement?.toFixed(0) || 0}%</span>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{ats_improvement?.new_score?.toFixed(0) || 0}</div>
                    <div className="text-xs text-gray-500 mt-1">Version {new_version}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeComparison;
