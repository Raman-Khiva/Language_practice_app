/**
 * Data Service
 * Handles fetching categories, questions, and other application data
 */

import { API_BASE_URL, QUESTIONS_PER_LESSON } from './constants';

/**
 * Fetch all available categories from server
 * @returns {Promise<object>} Categories data object
 */
export const fetchCategories = async () => {
  console.log(`🏷️ DATA SERVICE: Starting categories fetch...`);
  console.log(`📡 DATA SERVICE: Sending GET request to ${API_BASE_URL}/categories`);
  
  try {
    const startTime = Date.now();
    const response = await fetch(`${API_BASE_URL}/categories`);
    const endTime = Date.now();
    
    console.log(`📡 DATA SERVICE: Categories response received in ${endTime - startTime}ms`);
    console.log(`📡 DATA SERVICE: Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const categoryNames = Object.keys(data);
    const totalQuestions = Object.values(data).reduce((sum, count) => sum + (count || 0), 0);
    
    console.log(`✅ DATA SERVICE: Categories fetched successfully:`);
    console.log(`   📊 Found ${categoryNames.length} categories: [${categoryNames.join(', ')}]`);
    console.log(`   📚 Total questions across all categories: ${totalQuestions}`);
    console.log(`   📋 Category breakdown:`, data);
    
    return data;
  } catch (error) {
    console.log(`❌ DATA SERVICE: Categories fetch failed: ${error.message}`);
    console.log(`❌ DATA SERVICE: Error details:`, error);
    throw error;
  }
};

/**
 * Fetch questions for a specific category
 * @param {string} category - The category to fetch questions for
 * @returns {Promise<Array>} Array of questions for the category
 */
export const fetchQuestionsForCategory = async (category) => {
  console.log(`📚 DATA SERVICE: Starting questions fetch for category: ${category}`);
  console.log(`📡 DATA SERVICE: Sending GET request to ${API_BASE_URL}/questions?category=${category}`);
  
  try {
    const startTime = Date.now();
    const response = await fetch(`${API_BASE_URL}/questions?category=${category}`);
    const endTime = Date.now();
    
    console.log(`📡 DATA SERVICE: Questions response received in ${endTime - startTime}ms`);
    console.log(`📡 DATA SERVICE: Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const questions = await response.json();
    const totalLessons = Math.ceil(questions.length / QUESTIONS_PER_LESSON);
    
    console.log(`✅ DATA SERVICE: Questions fetched successfully for ${category}:`);
    console.log(`   📝 Total questions: ${questions.length}`);
    console.log(`   📖 Total lessons: ${totalLessons} (${QUESTIONS_PER_LESSON} questions per lesson)`);
    console.log(`   🔍 First question preview: ${questions[0]?.question?.substring(0, 50)}...`);
    
    // Log question IDs for debugging
    const questionIds = questions.map(q => q._id).slice(0, 5);
    console.log(`   🆔 Sample question IDs: [${questionIds.join(', ')}]${questions.length > 5 ? '...' : ''}`);
    
    return questions;
  } catch (error) {
    console.log(`❌ DATA SERVICE: Questions fetch failed for category ${category}: ${error.message}`);
    console.log(`❌ DATA SERVICE: Error details:`, error);
    throw error;
  }
};

/**
 * Extract lesson data from category questions based on lesson number
 * @param {Array} categoryQuestions - All questions for the category
 * @param {number} lessonNumber - The lesson number (1-based index)
 * @returns {Array} Subset of questions for the specific lesson
 */
export const extractLessonData = (categoryQuestions, lessonNumber) => {
  console.log(`📖 DATA SERVICE: Extracting lesson data...`);
  console.log(`   📚 Total available questions: ${categoryQuestions?.length || 0}`);
  console.log(`   📖 Requested lesson: ${lessonNumber}`);
  console.log(`   ⚙️ Questions per lesson: ${QUESTIONS_PER_LESSON}`);
  
  if (!Array.isArray(categoryQuestions) || categoryQuestions.length === 0) {
    console.log(`⚠️ DATA SERVICE: No questions available for lesson extraction`);
    return [];
  }
  
  const startIndex = (lessonNumber - 1) * QUESTIONS_PER_LESSON;
  const endIndex = startIndex + QUESTIONS_PER_LESSON;
  const totalLessons = Math.ceil(categoryQuestions.length / QUESTIONS_PER_LESSON);
  
  console.log(`   📊 Slice calculation: index ${startIndex} to ${endIndex - 1}`);
  console.log(`   📖 Available lessons: ${totalLessons}`);
  
  if (lessonNumber > totalLessons) {
    console.log(`⚠️ DATA SERVICE: Requested lesson ${lessonNumber} exceeds available lessons (${totalLessons})`);
    return [];
  }
  
  const lessonData = categoryQuestions.slice(startIndex, endIndex);
  
  console.log(`✅ DATA SERVICE: Lesson data extracted successfully:`);
  console.log(`   📝 Questions in this lesson: ${lessonData.length}`);
  console.log(`   🔍 First question: ${lessonData[0]?.question?.substring(0, 50)}...`);
  
  // Log lesson question IDs for debugging
  const lessonQuestionIds = lessonData.map(q => q._id);
  console.log(`   🆔 Lesson question IDs: [${lessonQuestionIds.join(', ')}]`);
  
  return lessonData;
};