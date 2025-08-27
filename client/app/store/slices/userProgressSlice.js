import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for user progress
export const getUserProgress = createAsyncThunk(
  'userProgress/getUserProgress',
  async (_, { rejectWithValue }) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('/api/progress', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message || 'Failed to fetch progress');
      }

      return {
        questionsCompleted: data.data.questionsCompleted,
        completedQuestions: data.data.completedQuestions,
        success: data.success
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch progress');
    }
  }
);

export const markQuestionCompleted = createAsyncThunk(
  'userProgress/markQuestionCompleted',
  async ({ questionId }, { rejectWithValue, getState }) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        return rejectWithValue('No token found');
      }

      // Check if question is already completed to avoid unnecessary API calls
      const { userProgress } = getState();
      if (userProgress.completedQuestions.includes(questionId)) {
        return {
          questionsCompleted: userProgress.questionsCompleted,
          completedQuestions: userProgress.completedQuestions,
          message: 'Question already completed',
          isAlreadyCompleted: true
        };
      }

      const response = await fetch('/api/progress/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ questionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to mark question as completed');
      }

      return {
        questionsCompleted: data.data.questionsCompleted,
        completedQuestions: data.data.completedQuestions,
        success: data.success,
        message: data.message,
        newlyCompleted: questionId
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to mark question as completed');
    }
  }
);

// Initial state
const initialState = {
  isFetched : false,
  questionsCompleted: 0,
  completedQuestions: [],
  isLoading: false,
  error: null,
  lastCompletedQuestion: null,
  progressStats: {
    totalQuestions: 0,
    completionPercentage: 0,
    streak: 0,
    lastActivityDate: null
  },
  recentActivity: []
};

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    clearProgressError: (state) => {
      state.error = null;
    },
    resetProgress: (state) => {
      return { ...initialState };
    },
    updateProgressStats: (state, action) => {
      state.progressStats = { ...state.progressStats, ...action.payload };
    },
    addToRecentActivity: (state, action) => {
      const { questionId, timestamp, questionData } = action.payload;
      state.recentActivity.unshift({
        questionId,
        timestamp: timestamp || new Date().toISOString(),
        questionData
      });
      
      // Keep only last 10 activities
      if (state.recentActivity.length > 10) {
        state.recentActivity = state.recentActivity.slice(0, 10);
      }
    },
    calculateCompletionPercentage: (state, action) => {
      const { totalQuestions } = action.payload;
      state.progressStats.totalQuestions = totalQuestions;
      state.progressStats.completionPercentage = totalQuestions > 0 
        ? Math.round((state.questionsCompleted / totalQuestions) * 100) 
        : 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user progress cases
      .addCase(getUserProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questionsCompleted = action.payload.questionsCompleted;
        state.completedQuestions = action.payload.completedQuestions;
        state.error = null;
        state.progressStats.lastActivityDate = new Date().toISOString();
        state.isFetched = true;
      })
      .addCase(getUserProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isFetched = true;
      })
      
      // Mark question completed cases
      .addCase(markQuestionCompleted.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(markQuestionCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Only update if it's not already completed
        if (!action.payload.isAlreadyCompleted) {
          state.questionsCompleted = action.payload.questionsCompleted;
          state.completedQuestions = action.payload.completedQuestions;
          state.lastCompletedQuestion = action.payload.newlyCompleted;
          
          // Update recent activity
          if (action.payload.newlyCompleted) {
            state.recentActivity.unshift({
              questionId: action.payload.newlyCompleted,
              timestamp: new Date().toISOString(),
              type: 'question_completed'
            });
            
            // Keep only last 10 activities
            if (state.recentActivity.length > 10) {
              state.recentActivity = state.recentActivity.slice(0, 10);
            }
          }
        }
        
        state.error = null;
        state.progressStats.lastActivityDate = new Date().toISOString();
      })
      .addCase(markQuestionCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearProgressError,
  resetProgress,
  updateProgressStats,
  addToRecentActivity,
  calculateCompletionPercentage
} = userProgressSlice.actions;

// Selectors
export const selectUserProgress = (state) => state.userProgress;
export const selectQuestionsCompleted = (state) => state.userProgress.questionsCompleted;
export const selectCompletedQuestions = (state) => state.userProgress.completedQuestions;
export const selectProgressLoading = (state) => state.userProgress.isLoading;
export const selectProgressIsFetched = (state) => state.userProgress.isFetched;
export const selectProgressError = (state) => state.userProgress.error;
export const selectLastCompletedQuestion = (state) => state.userProgress.lastCompletedQuestion;
export const selectProgressStats = (state) => state.userProgress.progressStats;
export const selectRecentActivity = (state) => state.userProgress.recentActivity;

// Helper selectors
export const selectIsQuestionCompleted = (state, questionId) => 
  state.userProgress.completedQuestions.includes(questionId);

export const selectCompletionPercentage = (state) => 
  state.userProgress.progressStats.completionPercentage;

export default userProgressSlice.reducer;