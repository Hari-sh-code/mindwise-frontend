export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'analyzed', label: 'Analyzed', color: 'bg-blue-500' },
  { value: 'applied', label: 'Applied', color: 'bg-green-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-500' },
];

export const getStatusColor = (status) => {
  const statusObj = STATUS_OPTIONS.find(s => s.value === status);
  return statusObj ? statusObj.color : 'bg-gray-500';
};

export const getMatchScoreColor = (score) => {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#3b82f6'; // blue
  if (score >= 40) return '#f59e0b'; // orange
  return '#ef4444'; // red
};
