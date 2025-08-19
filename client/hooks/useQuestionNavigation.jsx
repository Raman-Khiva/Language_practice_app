'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useQuestionNavigation = (lessonData, categories, categoryName, lessonId) => {
  const router = useRouter();
  const [questionNo, setQuestionNo] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  // Reset question state when lesson changes
  useEffect(() => {
    if (lessonData && lessonData.length > 0) {
      setQuestionNo(0);
      setShowScore(false);
      setQuestionAnswers([]);
    }
  }, [lessonData]);

  const recordAnswer = (isCorrect, userAnswer, correctAnswer) => {
    setQuestionAnswers(prev => [...prev, {
      questionIndex: questionNo,
      isCorrect,
      userAnswer,
      correctAnswer
    }]);
  };

  const handleNextQuestion = () => {
    const totalQuestions = lessonData?.length || 0;
    if (questionNo < totalQuestions - 1) {
      setQuestionNo(prev => prev + 1);
    } else {
      // Show score card after last question
      setShowScore(true);
    }
  };

  const handleSkip = () => {
    // Record as incorrect when skipped
    recordAnswer(false, '', lessonData[questionNo]?.spanish || '');
    handleNextQuestion();
  };

  const handleLessonComplete = () => {
    const totalLessons = Math.ceil(categories[categoryName] / 10);
    if (lessonId < totalLessons) {
      router.push(`/categories/${categoryName}/${lessonId + 1}`);
    } else {
      router.push(`/categories/${categoryName}`);
    }
  };

  const handleGoToCategory = () => {
    router.push(`/categories/${categoryName}`);
  };

  const handleNextLesson = () => {
    const totalLessons = Math.ceil(categories[categoryName] / 10);
    if (lessonId < totalLessons) {
      router.push(`/categories/${categoryName}/${lessonId + 1}`);
    } else {
      handleGoToCategory();
    }
  };

  return {
    questionNo,
    setQuestionNo,
    showScore,
    questionAnswers,
    recordAnswer,
    handleNextQuestion,
    handleSkip,
    handleLessonComplete,
    handleGoToCategory,
    handleNextLesson
  };
};