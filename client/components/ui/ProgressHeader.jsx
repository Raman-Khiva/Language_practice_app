'use client'

const ProgressHeader = ({ questionNo, totalQuestions }) => {
  const progressPercentage = ((questionNo + 1) * 100) / totalQuestions;

  return (
    <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center justify-between">
        <h3 className="text-sm md:text-base font-semibold text-gray-700">
          Question {questionNo + 1} of {totalQuestions}
        </h3>
        <span className="text-xs md:text-sm font-medium text-gray-500">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressHeader;