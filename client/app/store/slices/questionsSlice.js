import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL - adjust according to your setup
const API_BASE_URL = '/api/questions';

// Async thunks for API calls

// Add a new question
export const addQuestion = createAsyncThunk(
  'questions/addQuestion',
  async (questionData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to add question');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get questions by category
export const getQuestionsByCategory = createAsyncThunk(
  'questions/getQuestionsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}?category=${encodeURIComponent(category)}`);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to fetch questions');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mark question as completed
export const markQuestionCompleted = createAsyncThunk(
  'questions/markQuestionCompleted',
  async (questionId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token || localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/${questionId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to mark question as completed');
      }

      const result = await response.json();
      return {
        questionId,
        questionsCompleted: result.data.questionsCompleted
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get unanswered questions
export const getUnansweredQuestions = createAsyncThunk(
  'questions/getUnansweredQuestions',
  async (category = null, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token || localStorage.getItem('token');
      const url = category 
        ? `${API_BASE_URL}/unanswered?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/unanswered`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch unanswered questions');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  isDataFetched : false,
  questions: [],
  unansweredQuestions: [],
  completedQuestionIds: [],
  currentCategory: null,
  loading: false,
  addingQuestion: false,
  markingComplete: false,
  error: null,
  totalCompleted: 0,
};

// Questions slice
const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // Clear questions data
    clearQuestions: (state) => {
      state.questions = [];
      state.unansweredQuestions = [];
      state.currentCategory = null;
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set current category
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    
    // Manually add completed question ID (for optimistic updates)
    addCompletedQuestionId: (state, action) => {
      const questionId = action.payload;
      if (!state.completedQuestionIds.includes(questionId)) {
        state.completedQuestionIds.push(questionId);
      }
    },
    
    // Reset questions state
    resetQuestionsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Add Question
      .addCase(addQuestion.pending, (state) => {
        state.addingQuestion = true;
        state.error = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.addingQuestion = false;
        state.questions.push(action.payload);
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.addingQuestion = false;
        state.error = action.payload;
      })
      
      // Get Questions by Category
      .addCase(getQuestionsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        state.isDataFetched = true;
      })
      .addCase(getQuestionsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDataFetched = true;
      })
      
      // Mark Question Completed
      .addCase(markQuestionCompleted.pending, (state) => {
        state.markingComplete = true;
        state.error = null;
      })
      .addCase(markQuestionCompleted.fulfilled, (state, action) => {
        state.markingComplete = false;
        const { questionId, questionsCompleted } = action.payload;
        
        // Add to completed questions if not already there
        if (!state.completedQuestionIds.includes(questionId)) {
          state.completedQuestionIds.push(questionId);
        }
        
        // Update total completed count
        state.totalCompleted = questionsCompleted;
        
        // Remove from unanswered questions
        state.unansweredQuestions = state.unansweredQuestions.filter(
          question => question._id !== questionId
        );
      })
      .addCase(markQuestionCompleted.rejected, (state, action) => {
        state.markingComplete = false;
        state.error = action.payload;
      })
      
      // Get Unanswered Questions
      .addCase(getUnansweredQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUnansweredQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.unansweredQuestions = action.payload;
      })
      .addCase(getUnansweredQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearQuestions,
  clearError,
  setCurrentCategory,
  addCompletedQuestionId,
  resetQuestionsState,
} = questionsSlice.actions;

// Selectors
export const selectQuestions = (state) => state.questions.questions;
export const selectUnansweredQuestions = (state) => state.questions.unansweredQuestions;
export const selectCompletedQuestionIds = (state) => state.questions.completedQuestionIds;
export const selectCurrentCategory = (state) => state.questions.currentCategory;
export const selectQuestionsLoading = (state) => state.questions.loading;
export const selectisDataFetched = (state) => state.questions.isDataFetched;
export const selectAddingQuestion = (state) => state.questions.addingQuestion;
export const selectMarkingComplete = (state) => state.questions.markingComplete;
export const selectQuestionsError = (state) => state.questions.error;
export const selectTotalCompleted = (state) => state.questions.totalCompleted;

// Derived selectors
export const selectQuestionById = (state, questionId) =>
  state.questions.questions.find(question => question._id === questionId);

export const selectIsQuestionCompleted = (state, questionId) =>
  state.questions.completedQuestionIds.includes(questionId);

export const selectQuestionsByDifficulty = (state, difficulty) =>
  state.questions.questions.filter(question => question.difficulty === difficulty);

export const selectUnansweredQuestionsByDifficulty = (state, difficulty) =>
  state.questions.unansweredQuestions.filter(question => question.difficulty === difficulty);

// Export reducer
export default questionsSlice.reducer;