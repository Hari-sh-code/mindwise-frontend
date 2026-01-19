import { getStatusColor } from '../utils/constants';

const StatusBadge = ({ status }) => {
  const colorClass = getStatusColor(status);
  
  return (
    <span className={`${colorClass} px-3 py-1 rounded-full text-xs font-semibold text-white capitalize`}>
      {status}
    </span>
  );
};

export default StatusBadge;
