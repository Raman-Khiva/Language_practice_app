//in new file
'use client'
import ProgressHeader from '@/components/ui/ProgressHeader'
import React, { useEffect, useState } from 'react'
import ActionButtons from '@/components/ui/ActionButtons'
import AnswerInput from '@/components/ui/AnswerInput'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLesson } from '../store/slices/currentLessonSlice'
import {ScoreCard, GoodScoreCard, AverageScoreCard, NeedsImprovementScoreCard} from '@/components/ui/ScoreCardNew'
import AnswerSection from '@/components/ui/AnswerSection'
import { addLessonToProgress } from '../store/slices/userProgressSlice'

const cards = [<ScoreCard/>, <GoodScoreCard/>, <AverageScoreCard/>, <NeedsImprovementScoreCard/>];

const page = () => {
    const currentLesson = useSelector(selectCurrentLesson);
    const [currentIdx, setIdx] = useState(0);
    const [userAnswer, setUserAnswer] = useState(""); // Added missing state
    const [showAnswer, setShowAnswer] = useState(false); // Added missing state
    const [validationResult, setValidationResult] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const [validationError, setValidationError] = useState(null);
    // const [currCard, setCurrentCard] = useState(0);
    const [correctCount , incCorrectCount] = useState(0);
    const [borderStyling , setBorderStyling] = useState('border-violet-600/90 ring-5 ring-violet-300/50');
    const dispatch = useDispatch();
    
    // const changeCard = ()=>{
    //     const idx = Math.ceil(Math.random()*3);
    //     setCurrentCard(idx);
    // }
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

    const handleSubmit = async () => {
        if (userAnswer.trim()) {
            setShowAnswer(true);
            console.log(showAnswer);
            // Validate the translation
            await validateTranslation(currentLesson.lessonQuestions[currentIdx], userAnswer.trim());
        }
    };

    const handleSkip = () => {
        // Move to next question without validation
        setIdx((prev) => prev + 1);
        // Reset answer for next question
        setUserAnswer("");
        setShowAnswer(false);
        setValidationResult(null);
        setValidationError(null);
    };

    // Handle next question
    const handleNextQuestion = () => {
        if (currentIdx < 9) {
            setIdx((prev) => prev + 1);
            setUserAnswer("");
            setShowAnswer(false);
            setValidationResult(null);
            setValidationError(null);
        } else {
            // Last question completed, show score card
            setIdx(10);
            console.log(`FIELD - HANDLE_NEXT_QUESTION :${currentIdx}, lessonId : ${currentLesson.lessonId}, category : ${currentLesson.category} , difficulty : ${currentLesson.difficulty}`);
            dispatch(addLessonToProgress({lessonId: currentLesson.lessonId, category : currentLesson.category, difficulty : currentLesson.difficulty, correctCount : correctCount}));

        }
    };


    useEffect(() => {
      if (validationResult && validationResult.status === "CORRECT") {
        setBorderStyling('ring-5 border-green-600 ring-[#b2f1b6d9]')
      }
      else if(validationResult && validationResult.status === "WRONG"){
        setBorderStyling('ring-4 border-red-500 ring-red-200');
      }
      else setBorderStyling('border-violet-600/90 ring-5 ring-violet-300/50')
    }, [validationResult?.status]);




    if (!currentLesson.loading && !currentLesson.isFetchedLesson) {
        return (
            <div className='w-full h-screen grid place-items-center'>
                Not working! no request received.
            </div>
        )
    }

    if (currentLesson.loading) {
        return (
            <div className='w-full h-screen grid place-items-center'>
                loading
            </div>
        )
    }

    if (currentLesson.isFetchedLesson && currentLesson.error) {
        return (
            <div className='w-full h-screen grid place-items-center'>
                error occurred while fetching lesson! Move Back to home.
            </div>
        )
    }

    console.log("Field : CurrentLesson ,", currentLesson);

    return (
        //screen div
        <div className='w-full h-screen flex items-center justify-center p-20
                        bg-gradient-to-r from-[#dfd2f6f4] via-[#f7eccdf0] to-[#f9d4deea] 
        '>

            {/*main question and answer div*/}
            {currentIdx < 10 ? (
                <div className={` bg-[#fff]
                            h-[36rem] min-w-[56rem] max-w-[64rem] rounded-2xl 
                            flex border-2 ` + borderStyling
                }>
                    {/*question div */}
                    <div
                        className='flex-1'
                    >
                        <ProgressHeader totalQuestions={10} questionNo={currentIdx} />
                        <div className='p-6 flex flex-col gap-4 flex-wrap'>
                            <h4 className="text-md md:text-lg font-medium text-[#606060]">
                                Translate the given sentence to Spanish:
                            </h4>
                            <h2 className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed bg-gray-50 p-3 md:p-2 rounded-lg
                        text-wrap
                    ">
                                {currentLesson.lessonQuestions[currentIdx]}

                            </h2>

                        </div>
                    </div>

                    <div className='w-[2px] h-full bg-gradient-to-b from-[#fff] via-gray-300 to-[#fff] ' />

                    <div className='flex-1 p-6
                flex flex-col justify-between
            '>

                   {!showAnswer ?     (
                    <>
                        <AnswerInput
                            handleSubmit={handleSubmit}
                            value={userAnswer}
                            onChange={setUserAnswer}
                            placeholder="Type your answer here..."
                            disabled={showAnswer}
                            className="text-lg md:text-xl font-medium text-gray-800 border-2 outline-none rounded-xl border-gray-300 bg-white w-full py-3 md:py-4 px-3 md:px-4 resize-none min-h-28 md:min-h-32 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition flex-1"
                        />
                        <ActionButtons 
                            handleSkip={handleSkip} 
                            handleSubmit={handleSubmit}
                            userAnswer={userAnswer}
                        />
                      </>
                      ): (
                          <AnswerSection
                            disabled = {!showAnswer}
                            isValidating={isValidating}
                            validationError={validationError}
                            validationResult={validationResult}
                            userAnswer={userAnswer}
                            questionNo={currentIdx}
                            incCorrectCount = {incCorrectCount}
                            totalQuestions={10}
                            handleNextQuestion={handleNextQuestion}
                            correctCount = {correctCount}
                            // questionId={lessonData[questionNo]._id}
                            // addComplete={addComplete}
                            />

                        )
                   }
                        
                    </div>

                </div>) : ((correctCount==10)? <ScoreCard score={correctCount}/>:
                          (correctCount>6)?<GoodScoreCard score={correctCount}/>:
                          (correctCount>3)?<AverageScoreCard score={correctCount}/> : <NeedsImprovementScoreCard score={correctCount} />
                      
            )}

        </div>

    )
}

export default page