import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <div className="text-xl text-white">
                {user.first_name} {user.last_name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <div className="text-xl text-white">{user.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Account Type</label>
              <div className="text-xl text-white">
                {user.is_fresher ? (
                  <span className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fresher
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Experienced
                  </span>
                )}
              </div>
            </div>

            {user.created_at && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Member Since</label>
                <div className="text-xl text-white">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-dark-border">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 bg-dark-card border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">About MindWise</h3>
          <p className="text-gray-400 mb-4">
            MindWise helps freshers make smarter career decisions by providing AI-powered job analysis,
            skill gap identification, and personalized preparation tips.
          </p>
          <div className="text-sm text-gray-500">
            Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
