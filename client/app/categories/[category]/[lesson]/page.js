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
  const [questionNo, setQuestionNo] = useState(0); // 0-indexed for array access
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Validate category and lesson on mount and params change
  useEffect(() => {
    if (categories && Object.keys(categories).length > 0) {
      // Check if category exists
      if (!categories.hasOwnProperty(categoryName)) {
        notFound();
        return;
      }

      // Check if lesson number is valid (1 to total lessons for category)
      const totalLessons = Math.ceil(categories[categoryName] / 10);
      if (lessonId < 1 || lessonId > totalLessons) {
        notFound();
        return;
      }

      // Set current category and lesson if they're different
      if (currentCategory !== categoryName) {
        setCurrentCategory(categoryName);
      }
      if (currentLesson !== lessonId) {
        setCurrentLesson(lessonId);
      }

      setIsLoading(false);
    }
  }, [categories, categoryName, lessonId, currentCategory, currentLesson, setCurrentCategory, setCurrentLesson]);

  // Reset question state when lesson changes
  useEffect(() => {
    if (lessonData && lessonData.length > 0) {
      setQuestionNo(0);
      setUserAnswer("");
      setShowAnswer(false);
    }
  }, [lessonData]);

  // Loading state
  if (isLoading || !categories || Object.keys(categories).length === 0) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-2xl font-bold text-gray-700">
        Loading categories...
      </div>
    );
  }

  // Loading lesson data
  if (!lessonData || lessonData.length === 0) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-2xl font-bold text-gray-700">
        Loading lesson data...
      </div>
    );
  }

  // Get current question
  const currentQuestion = lessonData[questionNo];
  const totalQuestions = lessonData.length;
  const progressPercentage = ((questionNo + 1) * 100) / totalQuestions;

  // Handle answer submission
  const handleSubmit = () => {
    if (userAnswer.trim()) {
      setShowAnswer(true);
    }
  };

  // Handle skip question
  const handleSkip = () => {
    if (questionNo < totalQuestions - 1) {
      setQuestionNo(prev => prev + 1);
      setUserAnswer("");
      setShowAnswer(false);
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
    } else {
      handleLessonComplete();
    }
  };

  // Handle lesson completion
  const handleLessonComplete = () => {
    const totalLessons = Math.ceil(categories[categoryName] / 10);
    if (lessonId < totalLessons) {
      // Move to next lesson
      router.push(`/categories/${categoryName}/${lessonId + 1}`);
    } else {
      // All lessons completed, redirect to category page or completion page
      router.push(`/categories/${categoryName}`);
    }
  };

  // Answer component
  const AnswerComponent = () => (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 mt-4">
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Your Answer:</h4>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{userAnswer}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Correct Answer:</h4>
          <p className="text-green-600 bg-green-50 p-3 rounded-lg font-medium">
            it is working on orignial answer, please move ot next question
          </p>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 hover:scale-105 transition-all"
          >
            {questionNo < totalQuestions - 1 ? "Next Question" : "Complete Lesson"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-screen min-h-screen px-4 md:px-32 py-12 bg-fixed bg-gradient-to-r from-[#eaddffa7] via-[#fff1c288] to-[#eed6ddb5] flex flex-col items-center justify-center">
      <div className="bg-[#e0e4eeb5] p-[14px] border-2 border-[#969696] rounded-4xl max-w-4xl w-full">
        <div className="bg-white rounded-3xl overflow-hidden relative min-h-[600px]">
          
          {/* Progress header */}
          <div className="flex w-full h-12 items-center bg-[#aeaeae] relative">
            <h3 className="text-lg font-semibold text-white absolute left-1/2 transform -translate-x-1/2 z-10">
              Question {questionNo + 1} of {totalQuestions}
            </h3>
            <div 
              className="h-full bg-[#3763db] rounded-r-xl transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex flex-col justify-between h-[calc(100%-3rem)] p-6">
            
            {/* Question section */}
            <div className="flex flex-col justify-center flex-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-600">
                  Translate the given sentence to Spanish:
                </h3>
                <h2 className="text-2xl font-medium text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {currentQuestion.english}
                </h2>
              </div>

              {!showAnswer ? (
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="text-xl font-medium text-gray-700 border-2 outline-none rounded-xl border-gray-400 bg-white w-full py-4 px-4 resize-none min-h-32 focus:border-blue-500 transition-colors"
                  placeholder="Type your answer here..."
                  disabled={showAnswer}
                />
              ) : (
                <AnswerComponent />
              )}
            </div>

            {/* Action buttons */}
            {!showAnswer && (
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handleSkip}
                  className="text-gray-600 font-semibold hover:text-gray-800 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="px-6 py-3 text-white bg-blue-600 rounded-xl font-medium hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lesson info */}
      <div className="mt-6 text-center text-gray-600">
        <p className="text-lg font-medium">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} - Lesson {lessonId}
        </p>
      </div>
    </div>
  );
};

export default Question;