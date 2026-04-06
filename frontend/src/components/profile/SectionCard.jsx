import React from 'react';

const SectionCard = ({ title, onAdd, children }) => {
  return (
    <div className="bg-[#1a1f26] border border-gray-700 rounded-xl p-4 mb-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center text-sm bg-primary hover:bg-blue-600 text-white px-3 py-1.5 rounded transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
