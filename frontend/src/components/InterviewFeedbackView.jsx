import { useEffect, useState } from 'react';
import { interviewFeedbackAPI } from '../api/api';
import Loader from './Loader';
import InterviewRoundsList from './InterviewRoundsList';
import ImprovementPlanView from './ImprovementPlanView';

const InterviewFeedbackView = ({ jobId, refreshTrigger }) => {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeedback();
  }, [jobId, refreshTrigger]);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await interviewFeedbackAPI.get(jobId);
      setFeedback(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setFeedback(null);
      } else {
        setError(err.response?.data?.detail || 'Failed to load interview feedback');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePlanGenerated = () => {
    // Re-fetch feedback to get the updated plan
    loadFeedback();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-6">
        <p className="text-red-400">Error loading feedback: {error}</p>
      </div>
    );
  }

  if (!feedback) {
    return null;
  }

  const passPercentage =
    feedback.total_rounds > 0
      ? Math.round((feedback.rounds_passed / feedback.total_rounds) * 100)
      : 0;

  return (
    <div className="space-y-6 mt-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-2">Total Rounds</div>
          <div className="text-3xl font-bold text-primary">{feedback.total_rounds}</div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-2">Rounds Passed</div>
          <div className="text-3xl font-bold text-green-400">{feedback.rounds_passed}</div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-2">Pass Rate</div>
          <div className="text-3xl font-bold text-accent">{passPercentage}%</div>
        </div>
      </div>

      {/* Rounds Details */}
      <InterviewRoundsList rounds={feedback.interview_rounds} />

      {/* Improvement Plan */}
      <ImprovementPlanView
        jobId={jobId}
        plan={feedback.improvement_plan}
        onPlanGenerated={handlePlanGenerated}
      />
    </div>
  );
};

export default InterviewFeedbackView;
