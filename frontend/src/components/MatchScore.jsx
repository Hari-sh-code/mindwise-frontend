import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { getMatchScoreColor } from '../utils/constants';

const MatchScore = ({ score }) => {
  const color = getMatchScoreColor(score);
  
  const data = [
    { name: 'Match', value: score },
    { name: 'Gap', value: 100 - score },
  ];

  const COLORS = [color, '#1a1f26'];

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Match Score</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold" style={{ color }}>
              {score}%
            </div>
            <div className="text-sm text-gray-400">Match</div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          {score >= 80 && "Excellent match! You're highly qualified for this role."}
          {score >= 60 && score < 80 && "Good match! Focus on skill gaps to improve."}
          {score >= 40 && score < 60 && "Moderate match. Consider upskilling."}
          {score < 40 && "Low match. Significant preparation needed."}
        </p>
      </div>
    </div>
  );
};

export default MatchScore;
