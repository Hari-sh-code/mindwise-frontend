import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { resumeApi } from '../api/resumeApi';

import ResumeForm from '../components/resume/ResumeForm';
import ResumeList from '../components/resume/ResumeList';
import ResumePreview from '../components/resume/ResumePreview';
import ATSScoreCard from '../components/resume/ATSScoreCard';
import ResumeEditor from '../components/resume/ResumeEditor';
import ResumeComparison from '../components/resume/ResumeComparison';
import Loader from '../components/Loader';

const ResumePage = () => {
  const [activeResume, setActiveResume] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshListTrigger, setRefreshListTrigger] = useState(0);

  const handleGenerate = async ({ jobDescription }) => {
    setIsGenerating(true);
    setComparisonData(null);
    setIsEditing(false);
    try {
      const response = await resumeApi.generateResume({
        job_description: jobDescription,
      });
      setActiveResume(response.data);
      setRefreshListTrigger(prev => prev + 1);
      toast.success('Resume generated successfully!');
      
      // Auto-scroll to preview on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || 'Failed to generate resume');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectResume = async (id) => {
    setIsGenerating(true);
    setComparisonData(null);
    setIsEditing(false);
    try {
      const response = await resumeApi.getResumeById(id);
      setActiveResume(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load resume details');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCompare = async (oldId, newId) => {
    setIsGenerating(true);
    try {
      const response = await resumeApi.compareResumes({
        old_resume_id: oldId,
        new_resume_id: newId
      });
      setComparisonData(response.data);
      setActiveResume(null); // Clear active resume to show comparison instead
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || 'Failed to compare resumes');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSaveEdit = async (updatedData) => {
    if (!activeResume) return;
    try {
      const response = await resumeApi.updateResume(activeResume.id, { resume_data: updatedData });
      setActiveResume(response.data);
      toast.success('Resume updated');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update resume');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Optimize Resume</h2>
            <ResumeForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>
          
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 shadow-lg">
            <ResumeList 
              onSelect={handleSelectResume} 
              onCompare={(oldId) => {
                 if (activeResume) {
                   handleCompare(oldId, activeResume.id);
                 } else {
                   toast.error("Please load a new resume first, then compare against history.");
                 }
              }}
              refreshTrigger={refreshListTrigger} 
              activeId={activeResume?.id} 
            />
          </div>
        </div>

        {/* Right Column: Preview / Compare / Editor */}
        <div className="lg:col-span-7">
          {isGenerating ? (
            <div className="bg-dark-card border border-dark-border rounded-xl p-12 flex justify-center items-center h-full min-h-[500px]">
              <Loader message="Processing engine..." />
            </div>
          ) : comparisonData ? (
             <ResumeComparison data={comparisonData} onClear={() => setComparisonData(null)} />
          ) : activeResume ? (
            <div className="space-y-6 animate-fade-in relative">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-stretch">
                <div className="flex-1 w-full">
                   <ATSScoreCard score={activeResume.ats_score} />
                </div>
                {/* Actions container */}
                <div className="flex gap-2">
                   <button 
                     onClick={() => setIsEditing(!isEditing)} 
                     className="px-4 py-2 bg-dark-border hover:bg-gray-700 text-white rounded-lg transition-colors"
                   >
                     {isEditing ? "View Preview" : "Edit Resume"}
                   </button>
                   <button 
                      onClick={async () => {
                        try {
                          const response = await resumeApi.downloadResumePdf(activeResume.id);

                          const url = window.URL.createObjectURL(new Blob([response]));
                          const link = document.createElement("a");
                          link.href = url;
                          link.setAttribute("download", "resume.pdf");
                          document.body.appendChild(link);
                          link.click();

                          toast.success("Download started!");
                        } catch (err) {
                          console.error(err);
                          toast.error("Failed to download PDF");
                        }
                      }}
                     className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                   >
                     Download PDF
                   </button>
                </div>
              </div>

              {isEditing ? (
                 <ResumeEditor resume={activeResume} onSave={handleSaveEdit} onCancel={() => setIsEditing(false)}/>
              ) : (
                 <ResumePreview resume={activeResume} />
              )}
            </div>
          ) : (
            <div className="bg-dark-card border border-dark-border rounded-xl p-12 flex flex-col justify-center items-center h-full min-h-[500px] text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <h3 className="text-xl font-medium text-gray-300">No Resume Selected</h3>
              <p className="mt-2 text-center max-w-sm">Enter a job description on the left to generate an ATS-optimized resume, or select a past resume from your history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
