"use client";

/**
 * Product Context - Main Context Provider
 * Orchestrates all application state including categories, questions, auth, and progress
 * This is the main context that components will consume for global state
 */

import React, { useState, useEffect, createContext, useRef } from 'react';

// Import service modules
import { 
  loginUser, 
  registerUser, 
  fetchUserProfile, 
  storeAuthData, 
  getStoredAuthData, 
  clearStoredAuthData 
} from './authService';

import { 
  fetchCategories, 
  fetchQuestionsForCategory, 
  extractLessonData 
} from './dataService';

import { 
  createAuthFetch, 
  fetchUserProgress, 
  markQuestionComplete 
} from './progressService';

// =============================================================================
// CONTEXT CREATION
// =============================================================================

export const ProductContext = createContext(null);

// =============================================================================
// PRODUCT PROVIDER COMPONENT
// =============================================================================

let providerRenderCount = 0;

const ProductProvider = (props) => {
  // Increment render counter
  providerRenderCount++;
  console.log(`🔄 ProductProvider RENDER #${providerRenderCount}`);

  // ---------------------------------------------------------------------------
  // DATA STATE MANAGEMENT
  // ---------------------------------------------------------------------------

  const [allData, addNewData] = useState({});
  const [categories, setCategories] = useState({});
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [lessonData, setLessonData] = useState([]);

  // ---------------------------------------------------------------------------
  // AUTHENTICATION STATE
  // ---------------------------------------------------------------------------

  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ---------------------------------------------------------------------------
  // PROGRESS STATE
  // ---------------------------------------------------------------------------
  
  const [completedQuestionIds, setCompletedQuestionIds] = useState([]);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

  // ---------------------------------------------------------------------------
  // LOGGING STATE CHANGES
  // ---------------------------------------------------------------------------

  const prevState = useRef({});

  // Track state changes
  useEffect(() => {
    const currentState = {
      categoriesCount: Object.keys(categories).length,
      allDataKeys: Object.keys(allData),
      currentCategory,
      currentLesson,
      lessonDataLength: lessonData.length,
      hasAuthToken: Boolean(authToken),
      userId: user?.id || null,
      authLoading,
      completedCount: completedQuestionIds.length,
      questionsCompleted
    };

    if (prevState.current) {
      const changes = {};
      Object.keys(currentState).forEach(key => {
        if (JSON.stringify(prevState.current[key]) !== JSON.stringify(currentState[key])) {
          changes[key] = {
            from: prevState.current[key],
            to: currentState[key]
          };
        }
      });

      if (Object.keys(changes).length > 0) {
        console.log(`📊 STATE CHANGES causing re-render:`, changes);
      }
    }

    prevState.current = currentState;
  });

  // ---------------------------------------------------------------------------
  // DATA MANAGEMENT FUNCTIONS
  // ---------------------------------------------------------------------------

  const loadCategories = async () => {
    console.log(`🏷️ LOADING categories from server...`);
    try {
      const categoriesData = await fetchCategories();
      console.log(`✅ CATEGORIES loaded:`, Object.keys(categoriesData));
      setCategories(categoriesData);
    } catch (error) {
      console.error('❌ Failed to load categories:', error);
    }
  };

  const loadQuestionsForCategory = async (category) => {
    console.log(`📚 LOADING questions for category: ${category}...`);
    try {
      const questions = await fetchQuestionsForCategory(category);
      console.log(`✅ QUESTIONS loaded for ${category}: ${questions.length} questions`);
      
      addNewData(prev => ({ 
        ...prev, 
        [category]: questions
      }));
    } catch (error) {
      console.error(`❌ Failed to load questions for category ${category}:`, error);
    }
  };

  const updateLessonData = () => {
    if (!currentCategory || !allData[currentCategory]) {
      console.log(`⏭️ SKIPPING lesson data update - no category or data`);
      return;
    }

    const categoryQuestions = allData[currentCategory];
    const newLessonData = extractLessonData(categoryQuestions, currentLesson);
    console.log(`📖 UPDATING lesson data for ${currentCategory} lesson ${currentLesson}: ${newLessonData.length} questions`);
    setLessonData(newLessonData);
  };

  // ---------------------------------------------------------------------------
  // AUTHENTICATION FUNCTIONS
  // ---------------------------------------------------------------------------

  const login = async (email, password) => {
    console.log(`🔐 LOGGING IN user: ${email}...`);
    const result = await loginUser(email, password);
    
    if (result.ok) {
      console.log(`✅ LOGIN successful for: ${result.user.name}`);
      setAuthToken(result.token);
      setUser(result.user);
      storeAuthData(result.token, result.user);
      await refreshProgress();
    } else {
      console.log(`❌ LOGIN failed: ${result.error}`);
    }
    
    return result;
  };

  const register = async (name, email, password) => {
    console.log(`📝 REGISTERING user: ${email}...`);
    const result = await registerUser(name, email, password);
    
    if (result.ok) {
      console.log(`✅ REGISTRATION successful for: ${result.user.name}`);
      setAuthToken(result.token);
      setUser(result.user);
      storeAuthData(result.token, result.user);
      await refreshProgress();
    } else {
      console.log(`❌ REGISTRATION failed: ${result.error}`);
    }
    
    return result;
  };

  const logout = () => {
    console.log(`🚪 LOGGING OUT user: ${user?.name || 'unknown'}`);
    setAuthToken(null);
    setUser(null);
    clearStoredAuthData();
    setCompletedQuestionIds([]);
    setQuestionsCompleted(0);
  };

  // ---------------------------------------------------------------------------
  // PROGRESS FUNCTIONS
  // ---------------------------------------------------------------------------

  const refreshProgress = async () => {
    if (!authToken) {
      console.log(`⏭️ SKIPPING progress refresh - no auth token`);
      return;
    }
    
    console.log(`🔄 REFRESHING user progress...`);
    const authFetch = createAuthFetch(authToken);
    const progress = await fetchUserProgress(authFetch);
    
    console.log(`✅ PROGRESS refreshed: ${progress.completedQuestionIds.length} completed, ${progress.questionsCompleted} total`);
    setCompletedQuestionIds(progress.completedQuestionIds);
    setQuestionsCompleted(progress.questionsCompleted);
  };

  const addComplete = async (questionId) => {
    console.log(`✅ MARKING question complete: ${questionId}`);
    await markQuestionComplete(questionId, authToken);
    await refreshProgress();
  };

  // ---------------------------------------------------------------------------
  // LIFECYCLE EFFECTS
  // ---------------------------------------------------------------------------

  useEffect(() => {
    console.log(`🚀 EFFECT: Initial categories load`);
    loadCategories();
  }, []);

  useEffect(() => {
    console.log(`🔐 EFFECT: Auth initialization starting...`);
    const initAuth = async () => {
      try {
        const { token, user } = getStoredAuthData();
        
        if (token) {
          console.log(`🔑 FOUND stored token, validating...`);
          setAuthToken(token);
          if (user) {
            setUser(user);
            console.log(`👤 LOADED user from localStorage: ${user.name}`);
          }
          
          const profileResult = await fetchUserProfile(token);
          
          if (profileResult.ok) {
            console.log(`✅ TOKEN valid, user authenticated: ${profileResult.user.name}`);
            setUser(profileResult.user);
            storeAuthData(token, profileResult.user);
            await refreshProgress();
          } else {
            console.log(`❌ TOKEN invalid, logging out`);
            logout();
          }
        } else {
          console.log(`🔍 NO stored token found`);
        }
      } finally {
        console.log(`🏁 AUTH initialization complete`);
        setAuthLoading(false);
      }
    };
    
    initAuth();
  }, []);

  useEffect(() => {
    console.log(`🔄 EFFECT: Auth token changed - ${authToken ? 'authenticated' : 'not authenticated'}`);
    if (authToken) {
      refreshProgress();
    } else {
      setCompletedQuestionIds([]);
      setQuestionsCompleted(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  useEffect(() => {
    console.log(`📚 EFFECT: Category/data changed - currentCategory: ${currentCategory}, hasData: ${Boolean(allData[currentCategory])}`);
    if (currentCategory && !allData[currentCategory]) {
      loadQuestionsForCategory(currentCategory);
    }
  }, [currentCategory, allData]);

  useEffect(() => {
    console.log(`📖 EFFECT: Lesson data update triggered - category: ${currentCategory}, lesson: ${currentLesson}, hasData: ${Boolean(allData[currentCategory])}`);
    updateLessonData();
  }, [currentCategory, currentLesson, allData]);

  // ---------------------------------------------------------------------------
  // CONTEXT VALUE CREATION
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
    authFetch: createAuthFetch(authToken),

    // Progress state & actions
    completedQuestionIds,
    questionsCompleted,
    refreshProgress,
    addComplete
  };

  console.log(`📦 CONTEXT VALUE created with:`, {
    categories,
    categoriesCount: Object.keys(categories).length,
    allDataKeys: Object.keys(allData),
    currentCategory,
    currentLesson,
    lessonDataLength: lessonData.length,
    isAuthenticated: Boolean(authToken),
    completedCount: completedQuestionIds.length
  });

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;