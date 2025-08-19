"use client";

// Global product context
// - Manages categories and questions
// - Tracks current category/lesson and provides lesson data slices
// - Handles authentication (login/register/logout) and token persistence
// - Loads and exposes user progress (completed question IDs)
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
  // AUTH STATE
  // ---------------------------------------------------------------------------

  // JWT token and user profile
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ---------------------------------------------------------------------------
  // PROGRESS STATE
  // ---------------------------------------------------------------------------
  const [completedQuestionIds, setCompletedQuestionIds] = useState([]);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

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
   * Helper: authorized fetch wrapper
   */
  const authFetch = async (url, options = {}) => {
    const headers = new Headers(options.headers || {});
    if (authToken) headers.set('Authorization', `Bearer ${authToken}`);
    const isAbsolute = typeof url === 'string' && /^https?:\/\//i.test(url);
    const normalized = isAbsolute ? url : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    return fetch(normalized, { ...options, headers });
  };

  /**
   * Progress: load user's progress (completed question ids)
   */
  const refreshProgress = async () => {
    if (!authToken) return;
    try {
      const res = await authFetch('/progress');
      if (!res.ok) return;
      const data = await res.json();
      const ids = (data?.data?.completedQuestions || []).map((id) => id?.toString?.() || id);
      setCompletedQuestionIds(ids);
      setQuestionsCompleted(Number(data?.data?.questionsCompleted || ids.length || 0));
    } catch (e) {
      // noop
    }
  };

  /**
   * Auth: login user
   */
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data?.token) {
        throw new Error(data?.message || 'Login failed');
      }
      setAuthToken(data.token);
      console.log("Token is",authToken);
      setUser(data.data || null);
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.data || null));
      }
      // load progress after login
      await refreshProgress();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  /**
   * Auth: register user
   */
  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok || !data?.token) {
        throw new Error(data?.message || 'Registration failed');
      }
      setAuthToken(data.token);
      setUser(data.data || null);
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.data || null));
      }
      await refreshProgress();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  /**
   * Auth: logout user
   */
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
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

  /**
   * Attempt to ensure category data is fetched when a category becomes current
   */
  useEffect(() => {
    if (currentCategory && !allData[currentCategory]) {
      fetchQuestionsForCategory(currentCategory)
    }
  }, [currentCategory])

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
   * Effect: initialize auth from localStorage and validate profile
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem('authUser') : null;
        if (storedToken) {
          console.log("Token is : ",storedToken);
          setAuthToken(storedToken);
          if (storedUser) setUser(JSON.parse(storedUser));
          // Optionally refresh profile to ensure token validity
          const res = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (res.ok) {
            const profile = await res.json();
            setUser(profile?.data || null);
            if (typeof window !== 'undefined') {
              localStorage.setItem('authUser', JSON.stringify(profile?.data || null));
            }
            // Load progress after successful profile fetch
            await refreshProgress();
          } else {
            // Invalid token
            logout();
          }
        }
      } finally {
        setAuthLoading(false);
      }
    };
    initAuth();
  }, []);

  // When authToken changes from null → value, refresh progress
  useEffect(() => {
    if (authToken) {
      refreshProgress();
    } else {
      setCompletedQuestionIds([]);
      setQuestionsCompleted(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

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

    // Auth state & actions
    authToken,
    user,
    authLoading,
    isAuthenticated: Boolean(authToken),
    login,
    register,
    logout,
    authFetch,
    // Progress state & actions
    completedQuestionIds,
    questionsCompleted,
    refreshProgress,
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