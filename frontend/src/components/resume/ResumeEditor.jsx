import React, { useState } from 'react';

const ResumeEditor = ({ resume, onSave, onCancel }) => {
  // Convert the complex resume_data object to a formatted JSON string for editing
  const [jsonText, setJsonText] = useState(() => {
    return JSON.stringify(resume.resume_data, null, 2);
  });
  const [error, setError] = useState(null);

  const handleSave = () => {
    try {
      setError(null);
      const parsedData = JSON.parse(jsonText);
      // Additional simple validation to ensure structure is roughly intact
      if (typeof parsedData !== 'object' || Array.isArray(parsedData)) {
        throw new Error("Resume data must be a valid JSON object.");
      }

      onSave(parsedData);
    } catch (e) {
      setError("Invalid JSON format. Please check your syntax. " + e.message);
    }
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl shadow-lg flex flex-col h-[800px]">
      <div className="p-4 border-b border-dark-border flex justify-between items-center bg-[#111822] rounded-t-xl">
        <div>
          <h3 className="text-white font-bold text-lg">Advanced Resume Editor</h3>
          <p className="text-xs text-gray-400">Directly edit the underlying JSON structure to reorder, add, or modify any section.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-transparent hover:bg-gray-800 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-md shadow-lg transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Save Changes
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 m-4 rounded">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-sm text-red-400 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="flex-1 p-0 overflow-hidden relative">
        <div className="absolute top-2 right-4 text-xs text-gray-500 select-none pointer-events-none">
          Ensure valid JSON formatting (use double quotes for keys)
        </div>
        <textarea
          className="w-full h-full bg-[#0d1117] text-gray-300 font-mono text-sm p-4 border-none focus:ring-0 focus:outline-none resize-none"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default ResumeEditor;
