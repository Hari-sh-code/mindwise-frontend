import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI } from '../api/api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Analyze = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    job_description: '',
    resume_drive_link: '',
    user_notes: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for AI (excluding user_notes from AI analysis)
      const { user_notes, ...aiData } = formData;
      
      const response = await aiAPI.analyzeJob({
        ...aiData,
        user_notes: user_notes || undefined, // Include user_notes for DB storage only
      });
      
      // Backend returns { job_id, company_name, job_title, analysis }
      const jobId = response.data.job_id;
      
      if (!jobId || typeof jobId !== 'number') {
        console.error('Invalid job ID:', jobId, 'Full response:', response.data);
        throw new Error('Invalid job ID returned from server');
      }
      
      toast.success('Job analyzed successfully!');
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to analyze job. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analyze Job</h1>
          <p className="text-gray-400">
            Get AI-powered insights for your job application
          </p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-lighter border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Google"
                />
              </div>

              <div>
                <label htmlFor="job_title" className="block text-sm font-medium text-gray-300 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="job_title"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-lighter border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="job_description" className="block text-sm font-medium text-gray-300 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="job_description"
                name="job_description"
                value={formData.job_description}
                onChange={handleChange}
                required
                rows="10"
                className="w-full bg-dark-lighter border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Paste the complete job description here..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be analyzed by AI to match with your resume
              </p>
            </div>

            <div>
              <label htmlFor="resume_drive_link" className="block text-sm font-medium text-gray-300 mb-2">
                Resume Google Drive Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="resume_drive_link"
                name="resume_drive_link"
                value={formData.resume_drive_link}
                onChange={handleChange}
                required
                className="w-full bg-dark-lighter border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://drive.google.com/file/d/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Make sure the link has viewing permissions enabled
              </p>
            </div>

            <div>
              <label htmlFor="user_notes" className="block text-sm font-medium text-gray-300 mb-2">
                Personal Notes (Optional)
              </label>
              <textarea
                id="user_notes"
                name="user_notes"
                value={formData.user_notes}
                onChange={handleChange}
                rows="4"
                className="w-full bg-dark-lighter border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Add any personal notes about this application (these will NOT be sent to AI)"
              />
              <p className="text-xs text-gray-500 mt-1">
                🔒 Private notes - stored in your account only, never shared with AI
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-dark-border">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-dark-lighter border border-dark-border text-gray-300 hover:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading && <Loader size="sm" />}
                <span>{loading ? 'Analyzing...' : 'Analyze Job'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-500/10 border border-blue-500/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Copy the complete job description for better analysis</li>
            <li>• Ensure your resume link is publicly accessible</li>
            <li>• Use personal notes to track referrals, deadlines, or interview prep</li>
            <li>• Analysis typically takes 10-30 seconds depending on content length</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
