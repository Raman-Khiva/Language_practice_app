'use client'

const ValidationResult = ({ 
  validationResult, 
  userAnswer, 
  isValidating, 
  validationError,
  onNext,
  questionNo,
  totalQuestions 
}) => {
  if (isValidating) {
    return (
      <div className="bg-white border-2 border-gray-300 rounded-xl p-6 mt-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Validating your translation...</p>
        </div>
      </div>
    );
  }

  if (validationError) {
    return (
      <div className="bg-white border-2 border-red-300 rounded-xl p-6 mt-4">
        <div className="text-center text-red-600">
          <p className="font-medium mb-2">Validation Error</p>
          <p className="text-sm">{validationError}</p>
          <button
            onClick={onNext}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
          >
            {questionNo < totalQuestions - 1 ? "Next Question" : "Complete Lesson"}
          </button>
        </div>
      </div>
    );
  }

  if (!validationResult) return null;

  const isCorrect = validationResult.status === 'CORRECT';
  const statusColor = isCorrect ? 'green' : 'red';
  const bgColor = isCorrect ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isCorrect ? 'border-green-300' : 'border-red-300';

  return (
    <div className={`bg-white border-2 ${borderColor} rounded-xl p-6 mt-4`}>
      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <h4 className={`text-lg font-semibold text-${statusColor}-700`}>
            {isCorrect ? 'Correct!' : 'Needs Improvement'}
          </h4>
        </div>

        {/* User's answer */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Your Answer:</h4>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{userAnswer}</p>
        </div>

        {/* Correct translation */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            {isCorrect ? 'Great Translation!' : 'Suggested Translation:'}
          </h4>
          <p className={`text-${statusColor}-700 ${bgColor} p-3 rounded-lg font-medium`}>
            {validationResult.correctTranslation}
          </p>
        </div>

        {/* Issues */}
        {validationResult.issues && validationResult.issues.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Areas to improve:</h4>
            <div className="flex flex-wrap gap-2">
              {validationResult.issues.map((issue, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                >
                  {issue.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {validationResult.suggestions && validationResult.suggestions.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Tips:</h4>
            <ul className="space-y-1">
              {validationResult.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Grammar details */}
        {validationResult.grammarDetails && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Grammar Check:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(validationResult.grammarDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className={value === 'correct' ? 'text-green-600' : 'text-red-600'}>
                    {value === 'correct' ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <button
            onClick={onNext}
            className={`px-6 py-3 ${isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-xl font-medium hover:scale-105 transition-all`}
          >
            {questionNo < totalQuestions - 1 ? "Next Question" : "Complete Lesson"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationResult;
