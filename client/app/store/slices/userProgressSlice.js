import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for user progress
const baseApi = 'http://localhost:5000/api'



export const getUserProgress = createAsyncThunk(
  "userProgress/getUserProgress",
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log("GET-USER-PROGRESS: Thunk called");

      const state = getState();
      console.log("GET-USER-PROGRESS: Current state -", state);
      const token = state.auth.token;
      console.log("GET-USER-PROGRESS: Extracted token -", token);
      if (!token) {
        console.log("GET-USER-PROGRESS: No token found, rejecting");
        return rejectWithValue('No token found');
      }

      const response = await fetch(`${baseApi}/progress/getUserProgress`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      console.log("GET-USER-PROGRESS: Response data -", data);

      if (!data.success) {
        console.log("GET-USER-PROGRESS: API returned failure");
        return rejectWithValue(data.message || 'Failed to fetch progress');
      }
      return {
        lessonsStats: data.lessonsStats,
        dailyCount: data.dailyCount,
        categoryStats: data.categoryStats, 
      }


    }catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }

  }
);



// export const getUserProgress = createAsyncThunk(
//   'userProgress/getUserProgress',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       console.log("GET-USER-PROGRESS: Thunk called");

//       const state = getState();
//       console.log("GET-USER-PROGRESS: Current state -", state);

//       console.log("GET-USER-PROGRESS : AUTH STATE BEFORE ACCESSING TOKEN ,", state.auth);
//       const token = state.auth.token;
//       console.log("GET-USER-PROGRESS: Extracted token -", token);

//       if (!token) {
//         console.log("GET-USER-PROGRESS: No token found, rejecting");
//         return rejectWithValue('No token found');
//       }

//       console.log("GET-USER-PROGRESS: Sending request to", `${baseApi}/progress`);

//       const response = await fetch(`${baseApi}/progress`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       console.log("GET-USER-PROGRESS: Response status -", response.status);

//       const data = await response.json();
//       console.log("GET-USER-PROGRESS: Response data -", data);

//       if (!data.success) {
//         console.log("GET-USER-PROGRESS: API returned failure");
//         return rejectWithValue(data.message || 'Failed to fetch progress');
//       }

//       console.log("GET-USER-PROGRESS: Successfully fetched progress");
//       console.log("GET-USER-PROGRESS: Progress- TotalCount",data.progress.totalCount);
//       console.log("GET-USER-PROGRESS: Progress - DailyCount",data.progress.dailyCount);
//       console.log("GET-USER-PROGRESS: Progress - LessonsList", data.progress.lessonsList);

//       return {
//         totalCount: data.progress.totalCount,
//         dailyCount: data.progress.dailyCount,
//         lessonsList: data.progress.lessonsList,
//         success: data.success
//       };

//     } catch (error) {
//       console.log("GET-USER-PROGRESS: Error occurred -", error.message);
//       return rejectWithValue(error.message || 'Failed to fetch progress');
//     }
//   }
// );


// Async thunk for adding lesson progress (FnF style)
export const addLessonToProgress = createAsyncThunk(
  "userProgress/addLessonToProgress",
  async ({ lessonId,category,difficulty,correctCount }, { getState, rejectWithValue }) => {
    try {
      console.log("ADD-LESSON: Thunk called with lessonId -", lessonId);
      console.log("ADD-LESSON: Thunk called with category -", category);
      console.log("ADD-LESSON: Thunk called with correctCount -", correctCount);
      console.log("ADD-LESSON: Thunk called with difficulty -", difficulty);
      

      const state = getState();
      const token = state.auth.token;

      if (!token) {
        console.log("ADD-LESSON: No token found, rejecting");
        return rejectWithValue("No token found");
      }

      console.log("ADD-LESSON: Sending request to", `${baseApi}/progress/addToProgress`);

      const response = await fetch(`${baseApi}/progress/addToProgress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId,category,difficulty ,correctCount}),
      });

      console.log('ADD-LESSON : response from server : ',response);

      console.log("ADD-LESSON: Response status -", response.status);

      const data = await response.json();
      console.log("ADD-LESSON: Response data -", data);

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to add lesson");
      }

      // ✅ Fire-and-forget: just return minimal info
      return { lessonId, message: data.message };

    } catch (error) {
      console.log("ADD-LESSON: Error occurred -", error.message);
      return rejectWithValue(error.message || "Failed to add lesson");
    }
  }
);



// Initial state
const initialState = {
  lessonsStats           : [],
  dailyCount             : [],
  categoryStats          : [],
  difficultyWiseProgress : [],
  isFetched              : false,
  isLoading              : false,
  error                  : null,
};


const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get user progress cases
      .addCase(getUserProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProgress.fulfilled, (state, action)=>{
        state.lessonsStats = action.payload.lessonsStats;
        state.categoryStats = action.payload.categoryStats;
        state.dailyCount = action.payload.dailyCount;
        state.isLoading = false;
        state.error = null;
        state.isFetched = true;
      })
      .addCase(getUserProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isFetched = true;
      })
      
  },
});


// Selectors
export const selectUserProgress      = (state) => state.userProgress;
export const selectProgressLoading   = (state) => state.userProgress.isLoading;
export const selectProgressIsFetched = (state) => state.userProgress.isFetched;
export const selectProgressError     = (state) => state.userProgress.error;
export const selectLessonsStats      = (state) => state.userProgress.lessonsStats;
export const selectDailyCount        = (state) => state.userProgress.dailyCount;
export const selectCategoryStats     = (state) => state.userProgress.categoryStats;

export default userProgressSlice.reducer;