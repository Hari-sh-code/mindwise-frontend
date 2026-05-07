import React, { useState, useEffect } from 'react';
import { resumeApi } from '../../api/resumeApi';
import toast from 'react-hot-toast';

const ResumeList = ({ onSelect, onCompare, refreshTrigger, activeId }) => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, [refreshTrigger]);

  const fetchResumes = async () => {
    setIsLoading(true);
    try {
      // Fetch more than standard page size for a decent history view
      const response = await resumeApi.getResumes(1, 20);
      setResumes(response.data.resumes);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load resume history');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-bold text-white">Resume History</h3>
        {isLoading && <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>}
      </div>
      
      <div className="flex-1 overflow-y-auto max-h-[400px] border border-dark-border rounded-lg bg-[#111822]">
        {isLoading && resumes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Loading history...</div>
        ) : resumes.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No resumes generated yet.</div>
        ) : (
          <ul className="divide-y divide-dark-border">
            {resumes.map((resume) => (
              <li 
                key={resume.id} 
                className={`p-4 transition-colors ${activeId === resume.id ? 'bg-[#1a2333] border-l-4 border-l-primary' : 'hover:bg-[#1a2333] border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">Version {resume.version}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{formatDate(resume.created_at)}</div>
                    </div>
                    {resume.ats_score !== null && (
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                            resume.ats_score >= 80 ? 'bg-green-900/30 text-green-400' :
                            resume.ats_score >= 60 ? 'bg-yellow-900/30 text-yellow-500' :
                            'bg-red-900/30 text-red-500'
                        }`}>
                            {resume.ats_score.toFixed(0)}% ATS
                        </div>
                    )}
                </div>
                
                <div className="mt-3 flex space-x-2">
                    <button 
                      onClick={() => onSelect(resume.id)}
                      className="text-xs font-medium px-3 py-1.5 bg-dark-border hover:bg-gray-600 text-white rounded transition-colors"
                    >
                      {activeId === resume.id ? 'Viewing' : 'View'}
                    </button>
                    <button 
                      onClick={() => onCompare(resume.id)}
                      disabled={!activeId || activeId === resume.id}
                      className="text-xs font-medium px-3 py-1.5 bg-transparent border border-dark-border hover:border-gray-500 disabled:opacity-30 disabled:hover:border-dark-border text-gray-300 rounded transition-colors"
                      title={!activeId ? "Load a resume first" : activeId === resume.id ? "Cannot compare with itself" : `Compare with currently active resume`}
                    >
                      Compare
                    </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResumeList;
