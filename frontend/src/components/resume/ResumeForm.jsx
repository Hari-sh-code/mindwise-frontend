import React, { useState } from 'react';

const ResumeForm = ({ onGenerate, isGenerating }) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobDescription.trim().length < 50) {
      return;
    }
    onGenerate({ jobDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="jd" className="block text-sm font-medium text-gray-300 mb-1">
          Job Description
        </label>
        <textarea
          id="jd"
          rows={6}
          className="w-full bg-[#1a1f26] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-500 transition-colors"
          placeholder="Paste the target job description here (minimum 50 characters)..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          disabled={isGenerating}
        />
        <div className="flex justify-end mt-1">
            <span className={`text-xs ${jobDescription.length < 50 ? 'text-red-400' : 'text-gray-500'}`}>
                {jobDescription.length} / 50 min chars
            </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isGenerating || jobDescription.length < 50}
        className="w-full py-3 px-4 bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg inline-flex justify-center items-center transition-colors shadow-lg"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Optimized Resume...
          </>
        ) : (
          "Generate Resume"
        )}
      </button>
    </form>
  );
};

export default ResumeForm;
