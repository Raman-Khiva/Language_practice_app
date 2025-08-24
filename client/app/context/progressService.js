/**
 * Progress Service
 * Handles user progress tracking, completion status, and progress updates
 */

import { API_BASE_URL } from './constants';

/**
 * Create authenticated fetch wrapper with authorization header
 * @param {string} authToken - JWT authentication token
 * @returns {Function} Configured fetch function with auth headers
 */
export const createAuthFetch = (authToken) => {
  /**
   * Authenticated fetch wrapper
   * @param {string} url - API endpoint URL (relative or absolute)
   * @param {object} options - Fetch options object
   * @returns {Promise<Response>} Fetch response promise
   */
  return async (url, options = {}) => {
    const headers = new Headers(options.headers || {}); // Create headers object
    if (authToken) headers.set('Authorization', `Bearer ${authToken}`); // Add auth token to headers
    
    const isAbsolute = typeof url === 'string' && /^https?:\/\//i.test(url); // Check if URL is absolute
    const normalized = isAbsolute ? url : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`; // Normalize URL with base
    
    return fetch(normalized, { ...options, headers }); // Execute fetch with auth headers
  };
};

/**
 * Fetch user's progress data from server
 * @param {Function} authFetch - Authenticated fetch function
 * @returns {Promise<{completedQuestionIds: Array, questionsCompleted: number}>}
 */
export const fetchUserProgress = async (authFetch) => {
  try {
    const res = await authFetch('/progress'); // Request progress data from API
    
    if (!res.ok) { // Check if request failed
      throw new Error('Failed to fetch progress');
    }
    
    const data = await res.json(); // Parse JSON response
    
    // Extract completed question IDs and ensure they're strings
    const ids = (data?.data?.completedQuestions || []).map((id) => id?.toString?.() || id);
    
    // Extract questions completed count
    const questionsCompleted = Number(data?.data?.questionsCompleted || ids.length || 0);
    
    return { // Return progress data
      completedQuestionIds: ids,
      questionsCompleted
    };
  } catch (e) {
    console.error('Error fetching progress:', e); // Log error
    return { // Return empty progress on error
      completedQuestionIds: [],
      questionsCompleted: 0
    };
  }
};

/**
 * Mark a question as completed on the server
 * @param {string} questionId - ID of the completed question
 * @param {string} authToken - JWT authentication token
 * @returns {Promise<Response>} API response promise
 */
export const markQuestionComplete = async (questionId, authToken) => {
  console.log("Starting to send request to server to add question."); // Log completion attempt
  
  if (!authToken) { // Check if user is authenticated
    console.log("User not authenticated"); // Log authentication failure
    return null;
  }
  
  const headers = { // Prepare request headers
    'Authorization': `Bearer ${authToken}`, // Include auth token
    'Content-Type': 'application/json' // Set content type
  };
  
  console.log("User Authed"); // Log successful authentication
  
  try {
    const response = await fetch(`${API_BASE_URL}/progress/complete`, { // Send completion request
      method: 'POST',
      headers,
      body: JSON.stringify({ questionId: questionId }) // Send question ID in request body
    });
    
    console.log("Server responded for request to add question to userProgress with this res:", response); // Log server response
    return response; // Return response for caller to handle
  } catch (error) {
    console.error("Error marking question as complete:", error); // Log any errors
    throw error; // Re-throw for caller to handle
  }
};