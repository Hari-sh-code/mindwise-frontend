import { useState } from 'react';
import toast from 'react-hot-toast';
import { interviewFeedbackAPI } from '../api/api';
import Loader from './Loader';

const ImprovementPlanView = ({ jobId, plan, onPlanGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeneratePlan = async () => {
    try {
      setLoading(true);
      setError(null);
      toast.loading('Analyzing interview feedback...', { id: 'plan-toast' });

      const response = await interviewFeedbackAPI.generateImprovementPlan(jobId);
      
      if (onPlanGenerated) {
        onPlanGenerated(response.data);
      }

      toast.success('Improvement plan generated successfully!', { id: 'plan-toast' });
    } catch (err) {
      console.error('Error generating improvement plan:', err);
      const errMsg = err.response?.data?.detail || 'Failed to generate improvement plan';
      setError(errMsg);
      toast.error(errMsg, { id: 'plan-toast' });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="space-y-4 mt-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400">Error: {error}</p>
        </div>
        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (plan) {
    return (
      <div className="space-y-6 mt-6">
        <h3 className="text-2xl font-bold text-white">AI Improvement Plan</h3>

        {/* Failure Stage */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-2">Failed At</div>
          <h4 className="text-2xl font-bold text-accent">{plan.failure_stage}</h4>
        </div>

        {/* Weak Areas */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h4 className="text-lg font-bold text-white mb-4">Weak Areas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.weak_areas && plan.weak_areas.length > 0 ? (
              plan.weak_areas.map((areaObj, index) => (
                <div key={index} className="bg-dark border border-dark-border rounded-lg p-4">
                  <div className="text-red-400 font-semibold mb-1">
                    {typeof areaObj === 'string' ? areaObj : areaObj.area}
                  </div>
                  {areaObj.reason && (
                    <div className="text-gray-300 text-sm mt-1">{areaObj.reason}</div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No weak areas identified</p>
            )}
          </div>
        </div>

        {/* Recommended Topics */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h4 className="text-lg font-bold text-white mb-4">Recommended Topics to Study</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-300 flex flex-col">
            {plan.recommended_topics && plan.recommended_topics.length > 0 ? (
              plan.recommended_topics.map((topic, index) => (
                <li key={index} className="text-sm">{topic}</li>
              ))
            ) : (
              <p className="text-gray-400">No topics recommended</p>
            )}
          </ul>
        </div>

        {/* Practice Problems */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h4 className="text-lg font-bold text-white mb-4">Practice Problems</h4>
          <div className="space-y-4">
            {plan.practice_problems && plan.practice_problems.length > 0 ? (
              plan.practice_problems.map((problem, index) => (
                <div key={index} className="bg-dark border border-dark-border rounded-lg p-4">
                  {typeof problem === 'string' ? (
                    <p className="text-sm text-gray-300">{problem}</p>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-white">{problem.title}</h5>
                        {problem.difficulty && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            {problem.difficulty}
                          </span>
                        )}
                      </div>
                      {problem.description && (
                        <p className="text-sm text-gray-300">{problem.description}</p>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No practice problems available</p>
            )}
          </div>
        </div>

        {/* Improvement Strategy */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h4 className="text-lg font-bold text-white mb-4">Improvement Strategy</h4>
          <ol className="space-y-3">
            {plan.improvement_strategy && plan.improvement_strategy.length > 0 ? (
              plan.improvement_strategy.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-300 pt-1 text-sm">{step}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No strategy available</p>
            )}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 mt-6">
      <div className="text-center space-y-4">
        <p className="text-gray-400">
          Ready to improve? Generate a personalized AI improvement plan based on your interview feedback.
        </p>
        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader size="sm" />
              <span className="ml-2">Generating AI insights...</span>
            </>
          ) : (
            '✨ Generate AI Improvement Plan'
          )}
        </button>
      </div>
    </div>
  );
};

export default ImprovementPlanView;
