'use client'
import { ProductContext } from "@/app/context/ProductContext";
import { notFound, useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react"

import AnswerSection from "@/components/ui/AnswerSection";
import ProgressHeader from "@/components/ui/ProgressHeader";
import ActionButtons from "@/components/ui/ActionButtons";
import AnswerInput from "@/components/ui/AnswerInput";

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
    setCurrentCategory,
    addComplete
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
      console.log("This is lessonData array : ",lessonData);
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

  return (
    <div className="w-full h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-10 md:py-12 xl:py-12 bg-fixed bg-gradient-to-r from-[#eaddffa7] via-[#fff1c288] to-[#eed6ddb5] flex flex-col items-center justify-center">
      <div className="bg-white/60 h-[100%] backdrop-blur-xl p-3 mt-20 sm:p-4 border border-white/30 rounded-3xl md:rounded-4xl shadow-xl ring-1 ring-black/5 max-w-4xl w-full ">
        <div className="bg-white/90  rounded-2xl md:rounded-3xl overflow-hidden relative  h-full ">

          {/* Progress header */}
          <ProgressHeader questionNo={questionNo} totalQuestions={totalQuestions} />
          

          <div className="flex flex-col  h-[calc(100%-3rem)] px-4  pb-8 pt-4 sm:px-5 sm:pb-10 sm:pt-6">
            
            {/* Question section */}
            <div className="flex flex-col h-full space-y-4">
              <div className="space-y-2">
                <h3 className="text-md md:text-lg font-medium text-gray-700">
                  Translate the given sentence to Spanish:
                </h3>
                <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed bg-gray-50 p-3 md:p-2 rounded-lg">
                  {currentQuestion.english}
                  
                </h2>
              </div>

              {!showAnswer ? (

                  <AnswerInput
                    handleSubmit = {handleSubmit}
                    
                    value={userAnswer}
                    onChange={setUserAnswer}
                    placeholder="Type your answer here..."
                    disabled={showAnswer}
                    className="text-lg md:text-xl font-medium text-gray-800 border-2 outline-none rounded-xl border-gray-300 bg-white w-full py-3 md:py-4 px-3 md:px-4 resize-none min-h-28 md:min-h-32 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition flex-1"
                  />
                  
                ) : (
                  <AnswerSection
                  disabled = {!showAnswer}
                  isValidating={isValidating}
                  validationError={validationError}
                  validationResult={validationResult}
                  userAnswer={userAnswer}
                  questionNo={questionNo}
                  totalQuestions={totalQuestions}
                  handleNextQuestion={handleNextQuestion}
                  questionId={lessonData[questionNo]._id}
                  addComplete={addComplete}
                  />
                )}


            </div>




            {/* Action buttons */}
            {!showAnswer && (
                <ActionButtons  handleSkip={handleSkip}  handleSubmit={handleSubmit}   userAnswer={userAnswer}   />
            )}

          </div>
        </div>
      </div>

      {/* Lesson info */}
    </div>
  );
};

export default Question;