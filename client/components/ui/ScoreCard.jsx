'use client'
import { useMemo } from 'react';

const ScoreCard = ({ 
  answers, 
  categoryName, 
  lessonId, 
  totalLessons,
  onGoToCategory, 
  onNextLesson 
}) => {
  const scoreData = useMemo(() => {
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Performance message based on score
    let performanceMessage = "";
    let performanceColor = "";
    let performanceIcon = "";
    
    if (score >= 90) {
      performanceMessage = "Outstanding! You're mastering Spanish!";
      performanceColor = "text-green-600";
      performanceIcon = "🏆";
    } else if (score >= 80) {
      performanceMessage = "Great work! You're doing very well!";
      performanceColor = "text-green-600";
      performanceIcon = "🌟";
    } else if (score >= 70) {
      performanceMessage = "Good job! Keep practicing to improve!";
      performanceColor = "text-blue-600";
      performanceIcon = "👍";
    } else if (score >= 60) {
      performanceMessage = "Nice effort! A bit more practice will help!";
      performanceColor = "text-yellow-600";
      performanceIcon = "💪";
    } else {
      performanceMessage = "Keep practicing! You'll get better with time!";
      performanceColor = "text-orange-600";
      performanceIcon = "📚";
    }

    return {
      totalQuestions,
      correctAnswers,
      score,
      performanceMessage,
      performanceColor,
      performanceIcon
    };
  }, [answers]);

  const isLastLesson = lessonId >= totalLessons;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
      {/* Score Circle */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center bg-white shadow-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{scoreData.score}%</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>
        {/* Animated progress ring */}
        <svg className="absolute top-0 left-0 w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-blue-500"
            strokeDasharray={`${scoreData.score * 3.51} 351`}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Performance Message */}
      <div className="text-center space-y-2">
        <div className="text-4xl">{scoreData.performanceIcon}</div>
        <h2 className={`text-2xl font-bold ${scoreData.performanceColor}`}>
          {scoreData.performanceMessage}
        </h2>
      </div>

      {/* Score Details */}
      <div className="bg-gray-50 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Lesson Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Questions:</span>
            <span className="font-semibold text-gray-800">{scoreData.totalQuestions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Correct Answers:</span>
            <span className="font-semibold text-green-600">{scoreData.correctAnswers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Incorrect Answers:</span>
            <span className="font-semibold text-red-600">
              {scoreData.totalQuestions - scoreData.correctAnswers}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Accuracy:</span>
              <span className={`font-bold text-lg ${scoreData.performanceColor}`}>
                {scoreData.score}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category and Lesson Info */}
      <div className="text-center text-gray-600">
        <p className="text-lg font-medium">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} - Lesson {lessonId}
        </p>
        {!isLastLesson && (
          <p className="text-sm mt-1">
            Ready for Lesson {lessonId + 1}?
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={onGoToCategory}
          className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-all hover:scale-105 shadow-lg"
        >
          Back to {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </button>
        
        {!isLastLesson ? (
          <button
            onClick={onNextLesson}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-blue-700 transition-all hover:scale-105 shadow-lg"
          >
            Next Lesson
          </button>
        ) : (
          <button
            onClick={onGoToCategory}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg"
          >
            🎉 Category Complete!
          </button>
        )}
      </div>

      {/* Motivational Quote */}
      <div className="text-center text-gray-500 text-sm italic max-w-md">
        {scoreData.score >= 80 
          ? "\"The journey of a thousand miles begins with one step.\" - Keep going!"
          : "\"Every expert was once a beginner.\" - You're on the right path!"
        }
      </div>
    </div>
  );
};

export default ScoreCard;