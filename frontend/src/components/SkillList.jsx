const SkillList = ({ title, skills, type = 'default' }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'required':
        return 'border-blue-500 bg-blue-500/10 text-blue-400';
      case 'resume':
        return 'border-green-500 bg-green-500/10 text-green-400';
      case 'gap':
        return 'border-red-500 bg-red-500/10 text-red-400';
      default:
        return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeStyles()}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
