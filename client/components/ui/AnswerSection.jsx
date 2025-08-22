// AnswerComponent.jsx
'use client';

import { useEffect, useRef } from "react";

const AnswerSection = ({
  isValidating,
  validationError,
  validationResult,
  userAnswer,
  questionNo,
  totalQuestions,
  handleNextQuestion,
  disabled,
  questionId,
  addComplete
}) => {

  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        if (buttonRef.current && !buttonRef.current.disabled) {
          e.preventDefault();
          buttonRef.current.click(); // simulate real button click
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  if (isValidating) {
    return (
      <div className="bg-white border-2 border-gray-300 rounded-xl p-3 mt-4">
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

  const isCorrect = validationResult.status === "CORRECT";
  const statusColor = isCorrect ? "green" : "red";
  const bgColor = isCorrect ? "bg-green-50" : "bg-red-50";
  const borderColor = isCorrect ? "border-green-500" : "border-red-600";
  const gradientBorder = isCorrect? "bg-[#b3f2b0]":"bg-[#f6a199]"

  if(isCorrect){
    console.log("User's answer was correct , now starting to add question to userProgress!");
    addComplete(questionId);
  }

   
//   const bgColor = isCorrect ? ""

  return (
    <div className={`${gradientBorder} rounded-2xl p-[6px] h-full`}>
    <div className={`bg-white border-2 ${borderColor}   rounded-xl p-3 h-full`}>
     <div className="h-full flex flex-col justify-between ">
      <div className="space-y-2">
        {/* Status */}
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isCorrect ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <h4 className={`text-lg font-semibold text-${statusColor}-700`}>
            {isCorrect ? "Correct!" : "Needs Improvement"}
          </h4>
        </div>

        {/* User's answer */}
        <div>
          <h4 className="text-md text-lg font-semibold text-gray-700 mb-1">Your Answer:</h4>
          {isCorrect?
            <p className="text-[#0c7f32] bg-[#e1f4e2]  font-[500] px-3 py-2 rounded-lg">{userAnswer}</p>
            :<p className={`text-${statusColor}-700 bg-[#f6c4c4] text-lg px-3 py-2 rounded-lg font-medium`}>
                {userAnswer}   
            </p>
           }           
        </div>

        {/* Correct translation */}
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-1">
            {isCorrect ? "Great Translation!" : "Suggested Translation:"}
          </h4>
          <p
            className={`text-[#0c7f32] text-lg bg-[#e1f4e2] px-3 py-2 rounded-lg font-medium`}
          >
            {validationResult.correctTranslation}
          </p>
        </div>

        {/* Issues */}
        {validationResult.issues && validationResult.issues.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Areas to improve:
            </h4>
            <div className="flex flex-wrap gap-2">
              {validationResult.issues.map((issue, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                >
                  {issue.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {validationResult.suggestions && validationResult.suggestions.length > 0 && (
          <div className="pt-2">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Tips:</h4>
            <ul className="space-y-1">
              {validationResult.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="text-gray-600 text-sm flex items-center  space-x-2"
                >
                  <span className="text-blue-600 font-extrabold mt-1 relative bottom-1 ">•</span>
                  <span className="text-md font-[500] flex items-end">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Grammar details */}
        {validationResult.grammarDetails && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Grammar Check:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(validationResult.grammarDetails).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span
                      className={
                        value === "correct" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {value === "correct" ? "✓" : "✗"}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        </div>

        <div className="flex justify-center pt-2 w-full">
          <button
            disabled={disabled}
            ref={buttonRef}
            onClick={handleNextQuestion}
            className={`px-6 py-2 w-full ${
              isCorrect
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#f04545] hover:bg-red-500"
            } text-white rounded-xl font-medium hover:scale-102 transition-all cursor-pointer`}
          >
            {questionNo < totalQuestions - 1 ? "Next Question" : "Complete Lesson"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AnswerSection;
