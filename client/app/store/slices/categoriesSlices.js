import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL - adjust according to your setup
const API_BASE_URL = 'http://localhost:5000/api';

// Async thunks for API calls

// Get all categories
export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    console.log('THUNK-GET_CATEGORIES : Entered');
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      console.log('THUNK-GET_CATEGORIES : response received!');
      if (!response.ok) {
        console.log('THUNK-GET_CATEGORIES : response not ok!');
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to fetch categories');
      }
      
      const categoriesArray = await response.json();
      console.log('THUNK-GET_CATEGORIES : response correct! this is categoriesArray : ',categoriesArray);
      return  categoriesArray; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  categoriesList: [], // Array format: [{ name: "categoryName", count: number }]
  loading: false,
  dataFetched : false,
  error: null,
};

// Categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Clear categories data
    clearCategories: (state) => {
      state.categoriesList = [];
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
  
    resetCategoriesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesList = action.payload;
        state.lastFetched = new Date().toISOString();
        state.dataFetched = true;
        
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.dataFetched = true;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearCategories,
  clearError,
  resetCategoriesState
} = categoriesSlice.actions;

// Basic selectors
// export const selectCategories = (state) => state.categories.categories;
export const selectCategories = (state) => state.categories;
export const selectCategoriesList = (state) => state.categories.categoriesList;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesDataFetched = (state) => state.categories.dataFetched;
export const selectCategoriesError = (state) => state.categories.error;
export const selectLastFetched = (state) => state.categories.lastFetched;

// Derived selectors
// export const selectCategoryNames = (state) => 
//   Object.keys(state.categories.categories);

// export const selectCategoryByName = (state, categoryName) => 
//   state.categories.categories[categoryName];

// export const selectTotalQuestionsCount = (state) => 
//   Object.values(state.categories.categories).reduce((total, count) => total + count, 0);

// export const selectCategoriesWithQuestions = (state) => 
//   state.categories.categoriesList.filter(category => category.count > 0);

// export const selectCategoriesWithoutQuestions = (state) => 
//   state.categories.categoriesList.filter(category => category.count === 0);

// export const selectSortedCategoriesByCount = (state) => 
//   [...state.categories.categoriesList].sort((a, b) => b.count - a.count);

// export const selectSortedCategoriesByName = (state) => 
//   [...state.categories.categoriesList].sort((a, b) => a.name.localeCompare(b.name));

// export const selectCategoryExists = (state, categoryName) => 
//   state.categories.categories.hasOwnProperty(categoryName);

// // Check if categories data is stale (older than specified minutes)
// export const selectIsCategoriesDataStale = (state, maxAgeMinutes = 30) => {
//   if (!state.categories.lastFetched) return true;
  
//   const lastFetched = new Date(state.categories.lastFetched);
//   const now = new Date();
//   const diffMinutes = (now - lastFetched) / (1000 * 60);
  
//   return diffMinutes > maxAgeMinutes;
// };

// Export reducer
export default categoriesSlice.reducer;