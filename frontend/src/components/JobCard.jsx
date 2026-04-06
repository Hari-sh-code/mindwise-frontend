import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const JobCard = ({ job, onUpdate }) => {
  const navigate = useNavigate();

  const matchScore = job.ai_analysis?.match_score || 0;

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-primary transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {job.job_title}
            </h3>
            <p className="text-gray-400 mt-1">{job.company_name}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <StatusBadge status={job.status} />
            {job.ai_analysis && (
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{matchScore}%</div>
                <div className="text-xs text-gray-400">Match</div>
              </div>
            )}
          </div>
        </div>

        {job.job_description && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {job.job_description}
          </p>
        )}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Created: {new Date(job.created_at).toLocaleDateString()}</span>
          {job.ai_analysis && (
            <span className="text-primary">✓ Analyzed</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
