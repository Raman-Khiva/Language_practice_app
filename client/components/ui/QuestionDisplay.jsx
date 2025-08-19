'use client'

const QuestionDisplay = ({ englishText }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-medium text-gray-700">
        Translate the given sentence to Spanish:
      </h3>
      <h2 className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed bg-gray-50 p-3 md:p-4 rounded-lg">
        {englishText}
      </h2>
    </div>
  );
};