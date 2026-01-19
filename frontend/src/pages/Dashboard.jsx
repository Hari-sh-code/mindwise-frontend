import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobAPI } from '../api/api';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { STATUS_OPTIONS } from '../utils/constants';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, [filter]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const statusParam = filter === 'all' ? null : filter;
      const response = await jobAPI.getAll(statusParam);
      // Backend returns { jobs: [...], total, page, page_size }
      const jobsData = Array.isArray(response.data.jobs) ? response.data.jobs : [];
      setJobs(jobsData);
    } catch (error) {
      console.error('Failed to load jobs:', error);
      toast.error('Failed to load jobs');
      setJobs([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Job Applications</h1>
            <p className="text-gray-400">Track and analyze your job applications</p>
          </div>
          <Link
            to="/analyze"
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Analyze New Job
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
            }`}
          >
            All
          </button>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              onClick={() => setFilter(status.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === status.value
                  ? 'bg-primary text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-dark-card border border-dark-border rounded-lg p-12 max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
              <p className="text-gray-400 mb-6">
                {filter === 'all'
                  ? 'Start by analyzing your first job application!'
                  : `No jobs with status "${filter}"`}
              </p>
              <Link
                to="/analyze"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Analyze Your First Job
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
