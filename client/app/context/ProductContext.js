"use client";

import React, { useState, useEffect, createContext } from 'react';

// =============================================================================
// CONTEXT CREATION
// =============================================================================

/**
 * Product Context - Provides global state management for:
 * - Categories data
 * - Questions data organized by category
 * - Current category and lesson navigation
 * - Lesson-specific question data
 */
export const ProductContext = createContext(null);

// =============================================================================
// CONSTANTS & CONFIGURATION
// =============================================================================

const API_BASE_URL = 'http://localhost:5000/api';
const QUESTIONS_PER_LESSON = 10;

// =============================================================================
// PRODUCT PROVIDER COMPONENT
// =============================================================================

const ProductProvider = (props) => {
  // ---------------------------------------------------------------------------
  // STATE MANAGEMENT
  // ---------------------------------------------------------------------------

  // All fetched data organized by category
  const [allData, addNewData] = useState({});
  
  // Available categories from the server
  const [categories, setCategories] = useState({});
  
  // Currently selected category
  const [currentCategory, setCurrentCategory] = useState(null);
  
  // Current lesson number (1-based index)
  const [currentLesson, setCurrentLesson] = useState(1);
  
  // Questions for the current lesson (subset of category data)
  const [lessonData, setLessonData] = useState([]);

  // ---------------------------------------------------------------------------
  // API UTILITY FUNCTIONS
  // ---------------------------------------------------------------------------

  /**
   * Fetches categories from the server
   */
  const fetchCategories = async () => {
    try {
      console.log("Fetching categories from server...");
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      
      setCategories(data);
      console.log("Categories fetched successfully:", data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  /**
   * Fetches questions for a specific category
   * @param {string} category - The category to fetch questions for
   */
  const fetchQuestionsForCategory = async (category) => {
    try {
      console.log(`Fetching questions for category: ${category}`);
      const response = await fetch(`${API_BASE_URL}/questions?category=${category}`);
      const questions = await response.json();
      
      console.log(`Questions for category ${category} fetched successfully:`, questions);
      
      // Add the new category data to our state
      addNewData(prev => ({ 
        ...prev, 
        [category]: questions 
      }));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  /**
   * Extracts lesson data from category questions based on current lesson
   * @param {string} category - The category to extract lesson data from
   * @param {number} lessonNumber - The lesson number (1-based)
   */
  const extractLessonData = (category, lessonNumber) => {
    const startIndex = (lessonNumber - 1) * QUESTIONS_PER_LESSON;
    const endIndex = startIndex + QUESTIONS_PER_LESSON;
    const categoryQuestions = allData[category] || [];
    
    const newLessonData = categoryQuestions.slice(startIndex, endIndex);
    setLessonData(newLessonData);
    
    console.log(`Lesson data extracted for category ${category}, lesson ${lessonNumber}:`, newLessonData);
  };

  // ---------------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------------

  /**
   * Effect: Fetch all categories on component mount
   * Runs once when the component is first rendered
   */
  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * Effect: Handle category and lesson changes
   * Fetches questions if needed and updates lesson data
   */
  useEffect(() => {
    // Exit early if no category is selected
    if (!currentCategory) {
      console.log("No category selected, skipping data fetch");
      return;
    }

    const handleCategoryLessonChange = async () => {
      // Check if we need to fetch data for this category
      if (!allData[currentCategory]) {
        // Category data not yet loaded - fetch it
        await fetchQuestionsForCategory(currentCategory);
      } else {
        // Category data already loaded - extract lesson data
        extractLessonData(currentCategory, currentLesson);
      }
    };

    handleCategoryLessonChange();
    
    // Note: allData dependency will trigger this effect when new category data is added
  }, [currentCategory, currentLesson, allData]);

  // ---------------------------------------------------------------------------
  // CONTEXT VALUE
  // ---------------------------------------------------------------------------

  const contextValue = {
    // Data state
    categories,
    allData,
    lessonData,
    
    // Navigation state
    currentCategory,
    currentLesson,
    
    // Navigation actions
    setCurrentCategory,
    setCurrentLesson,
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default ProductProvider;