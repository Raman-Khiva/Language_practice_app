'use client'
import { ProductContext } from "@/app/context/ProductContext";
import { notFound, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react"

// url is /categories/[category]/[lesson]
// This component expects params: { category: string, lesson: string }

const Question = ({ params }) => {
  const router = useRouter();
  const { 
    currentLesson,
    lessonData,
    setCurrentLesson,
    categories,
    currentCategory,
    setCurrentCategory
  } = useContext(ProductContext);
  
  // Parse URL parameters
  const categoryName = params.category;
  const lessonId = parseInt(params.lesson, 10);
  
  // Component state
  const [questionNo, setQuestionNo] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState(null);

  // Validate translation function
  const validateTranslation = async (originalText, spanishTranslation) => {
    try {
      setIsValidating(true);
      setValidationError(null);
      
      const response = await fetch('http://localhost:5000/api/translation/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalText: originalText,
          spanishTranslation: spanishTranslation
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setValidationResult(result.data);
      } else {
        throw new Error(result.message || 'Validation failed');
      }
    } catch (error) {
      console.error('Translation validation error:', error);
      setValidationError(error.message);
      // Set a fallback result
      setValidationResult({
        status: 'ERROR',
        correctTranslation: spanishTranslation,
        issues: ['validation-error'],
        suggestions: ['Could not validate translation. Please try again.']
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Validate category and lesson on mount and params change
  useEffect(() => {
    if (categories && Object.keys(categories).length > 0) {
      if (!categories.hasOwnProperty(categoryName)) {
        notFound();
        return;
      }

      const totalLessons = Math.ceil(categories[categoryName] / 10);
      if (lessonId < 1 || lessonId > totalLessons) {
        notFound();
        return;
      }

      if (currentCategory !== categoryName) {
        setCurrentCategory(categoryName);
      }
      if (currentLesson !== lessonId) {
        setCurrentLesson(lessonId);
      }

      setIsLoading(false);
    }
  }, [categories, categoryName, lessonId, currentCategory, currentLesson]);

  // Reset question state when lesson changes
  useEffect(() => {
    if (lessonData && lessonData.length > 0) {
      setQuestionNo(0);
      setUserAnswer("");
      setShowAnswer(false);
      setValidationResult(null);
      setValidationError(null);
    }
  }, [lessonData]);

  // Loading state
  if (isLoading || !categories || Object.keys(categories).length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-700 px-4">
        Loading categories...
      </div>
    );
  }

  // Loading lesson data
  if (!lessonData || lessonData.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-700 px-4">
        Loading lesson data...
      </div>
    );
  }

  // Get current question
  const currentQuestion = lessonData[questionNo];
  const totalQuestions = lessonData.length;
  const progressPercentage = ((questionNo + 1) * 100) / totalQuestions;

  // Handle answer submission
  const handleSubmit = async () => {
    if (userAnswer.trim()) {
      setShowAnswer(true);
      // Validate the translation
      await validateTranslation(currentQuestion.english, userAnswer.trim());
    }
  };

  // Handle skip question
  const handleSkip = () => {
    if (questionNo < totalQuestions - 1) {
      setQuestionNo(prev => prev + 1);
      setUserAnswer("");
      setShowAnswer(false);
      setValidationResult(null);
      setValidationError(null);
    } else {
      handleLessonComplete();
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (questionNo < totalQuestions - 1) {
      setQuestionNo(prev => prev + 1);
      setUserAnswer("");
      setShowAnswer(false);
      setValidationResult(null);
      setValidationError(null);
    } else {
      handleLessonComplete();
    }
  };

  // Handle lesson completion
  const handleLessonComplete = () => {
    const totalLessons = Math.ceil(categories[categoryName] / 10);
    if (lessonId < totalLessons) {
      router.push(`/categories/${categoryName}/${lessonId + 1}`);
    } else {
      router.push(`/categories/${categoryName}`);
    }
  };

  // Answer component with validation results
  const AnswerComponent = () => {
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
              onClick={handleNextQuestion}
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

          {/* Issues (if any) */}
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

          {/* Grammar details (if available) */}
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
              onClick={handleNextQuestion}
              className={`px-6 py-3 ${isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-xl font-medium hover:scale-105 transition-all`}
            >
              {questionNo < totalQuestions - 1 ? "Next Question" : "Complete Lesson"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-10 md:py-12 bg-fixed bg-gradient-to-r from-[#eaddffa7] via-[#fff1c288] to-[#eed6ddb5] flex flex-col items-center justify-center">
      <div className="bg-white/60 backdrop-blur-xl p-3 sm:p-4 border border-white/30 rounded-3xl md:rounded-4xl shadow-xl ring-1 ring-black/5 max-w-4xl w-full">
        <div className="bg-white/90 rounded-2xl md:rounded-3xl overflow-hidden relative min-h-[520px] md:min-h-[600px]">

          {/* Progress header */}
          <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm md:text-base font-semibold text-gray-700">
                Question {questionNo + 1} of {totalQuestions}
              </h3>
              <span className="text-xs md:text-sm font-medium text-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-[calc(100%-3rem)] p-4 sm:p-6">
            
            {/* Question section */}
            <div className="flex flex-col justify-center flex-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-medium text-gray-700">
                  Translate the given sentence to Spanish:
                </h3>
                <h2 className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed bg-gray-50 p-3 md:p-4 rounded-lg">
                  {currentQuestion.english}
                </h2>
              </div>

              {!showAnswer ? (
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-lg md:text-xl font-medium text-gray-800 border-2 outline-none rounded-xl border-gray-300 bg-white w-full py-3 md:py-4 px-3 md:px-4 resize-none min-h-28 md:min-h-32 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                  placeholder="Type your answer here..."
                  disabled={showAnswer}
                />
              ) : (
                <AnswerComponent />
              )}
            </div>

            {/* Action buttons */}
            {!showAnswer && (
              <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-200">
                <button
                  onClick={handleSkip}
                  className="text-gray-600 font-semibold hover:text-gray-800 transition-colors text-sm md:text-base px-3 py-2 rounded-full hover:bg-gray-50"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="px-5 md:px-6 py-2.5 md:py-3 text-white rounded-full font-medium bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lesson info */}
      <div className="mt-6 text-center text-gray-600 px-4">
        <p className="text-base md:text-lg font-medium">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} - Lesson {lessonId}
        </p>
      </div>
    </div>
  );
};

export default Question;