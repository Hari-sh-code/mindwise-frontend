import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              MindWise
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            AI-powered clarity for your job applications
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Make smarter career decisions with AI-powered job analysis. Get personalized insights,
            skill gap analysis, and preparation tips for every opportunity.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border-2 border-primary hover:bg-primary/10 text-primary text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-32">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-card border border-dark-border rounded-lg p-8 text-center hover:border-primary transition-all duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Paste Job Description
              </h3>
              <p className="text-gray-400">
                Copy and paste the job description from any job posting you're interested in.
              </p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-8 text-center hover:border-primary transition-all duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Add Resume Link
              </h3>
              <p className="text-gray-400">
                Share your Google Drive resume link for AI to analyze your qualifications.
              </p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-8 text-center hover:border-primary transition-all duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Get AI Insights
              </h3>
              <p className="text-gray-400">
                Receive personalized match scores, skill gaps, and preparation tips instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Match Score Analysis</h3>
                  <p className="text-gray-400">
                    Get an accurate match percentage based on your skills vs. job requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Skill Gap Identification</h3>
                  <p className="text-gray-400">
                    Identify exactly what skills you need to develop to land the job.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Preparation Tips</h3>
                  <p className="text-gray-400">
                    Get personalized advice on how to prepare for the specific role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50 rounded-lg p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to make smarter career decisions?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join freshers who are using AI to land their dream jobs
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Analyzing Jobs Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
