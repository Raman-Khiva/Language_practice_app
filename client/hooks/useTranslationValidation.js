'use client'
import { useState } from 'react';

const server_url = process.env.NEXT_PUBLIC_MODE === 'DEV'
  ? process.env.NEXT_PUBLIC_LOCAL_SERVER_URL
  : process.env.NEXT_PUBLIC_SERVER_URL;

export const useTranslationValidation = () => {
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const validateTranslation = async (originalText, spanishTranslation) => {
    try {
      setIsValidating(true);
      setValidationError(null);
      
      const response = await fetch(`${server_url}/api/translation/validate`, {
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

  const resetValidation = () => {
    setValidationResult(null);
    setValidationError(null);
    setIsValidating(false);
  };

  return {
    validationResult,
    isValidating,
    validationError,
    validateTranslation,
    resetValidation
  };
};
