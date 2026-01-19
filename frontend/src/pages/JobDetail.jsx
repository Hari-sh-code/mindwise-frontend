import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI } from '../api/api';
import MatchScore from '../components/MatchScore';
import SkillList from '../components/SkillList';
import Notes from '../components/Notes';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { STATUS_OPTIONS } from '../utils/constants';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    setLoading(true);
    try {
      const response = await jobAPI.getById(id);
      setJob(response.data);
    } catch (error) {
      console.error('Failed to load job:', error);
      toast.error('Failed to load job details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await jobAPI.updateStatus(id, newStatus);
      setJob({ ...job, status: newStatus });
      toast.success('Status updated');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await jobAPI.delete(id);
      toast.success('Job deleted');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete job:', error);
      toast.error('Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!job) {
    return null;
  }

  const analysis = job.ai_analysis;

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white mb-4 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Dashboard</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{job.job_title}</h1>
              <p className="text-xl text-gray-400 mb-4">{job.company_name}</p>
              <div className="flex items-center space-x-4">
                <StatusBadge status={job.status} />
                <span className="text-gray-500 text-sm">
                  Created: {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Status Selector */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Update Status</h3>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                disabled={updatingStatus || job.status === status.value}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  job.status === status.value
                    ? `${status.color} text-white`
                    : 'bg-dark-lighter text-gray-400 hover:text-white border border-dark-border'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Job Description</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{job.job_description}</p>
          
          {job.resume_drive_link && (
            <div className="mt-4 pt-4 border-t border-dark-border">
              <a
                href={job.resume_drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View Resume</span>
              </a>
            </div>
          )}
        </div>

        {/* AI Analysis Section */}
        {analysis ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">AI Analysis</h2>

            {/* Match Score */}
            {analysis.match_score !== undefined && (
              <MatchScore score={analysis.match_score} />
            )}

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-6">
              {analysis.required_skills && (
                <SkillList
                  title="Required Skills"
                  skills={analysis.required_skills}
                  type="required"
                />
              )}

              {analysis.resume_skills && (
                <SkillList
                  title="Your Skills"
                  skills={analysis.resume_skills}
                  type="resume"
                />
              )}
            </div>

            {analysis.skill_gap && (
              <SkillList
                title="Skill Gap - Focus on These"
                skills={analysis.skill_gap}
                type="gap"
              />
            )}

            {/* Preparation Tips */}
            {analysis.preparation_tips && (
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Preparation Tips</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{analysis.preparation_tips}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">⚠️ Not Analyzed Yet</h3>
            <p className="text-gray-300">
              This job hasn't been analyzed by AI yet. The analysis may still be processing.
            </p>
          </div>
        )}

        {/* Notes Section */}
        <div className="mt-6">
          <Notes jobId={id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
