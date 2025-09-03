import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Async thunk to set the current lesson by index.
 * This checks the global Redux state for lessons,
 * picks the one at the requested index,
 * and stores its details in the `currentLesson` slice.
 */


export const setLesson = createAsyncThunk(
  "currentLesson/setLesson",
  async ({ index }, { getState, rejectWithValue }) => {
    try {
      console.log("👉 setLesson called with index:", index);

      // ✅ Access the Redux state
      const state = getState();
      console.log("📦 Full Redux state (lessons part):", state.lessons);

      // ✅ Get all current lessons
      const currentLessons = state.lessons.currentLessons;
      console.log("📚 Current lessons array:", currentLessons);

      // ✅ Pick lesson by index
      const currentLesson = currentLessons?.[index];
      console.log("🎯 Picked lesson:", currentLesson);

      // ✅ If lesson exists → return its data
      if (currentLesson) {
        console.log("✅ Lesson found, returning payload...");
        return {
          isFetchedLesson: true,
          lessonId: currentLesson._id,
          lessonQuestions: currentLesson.questions,
          difficulty : currentLesson.difficulty,
          category : currentLesson.category,
        };
      }

      // ❌ If not found → reject
      console.warn("⚠️ No lesson found at index:", index);
      return rejectWithValue({
        error: "No lesson found!",
      });
    } catch (error) {
      console.error("💥 Error in setLesson thunk:", error);
      return rejectWithValue({
        error: error.message || "Something went wrong",
      });
    }
  }
);



const initialState = {
  isLoading: false,
  isFetchedLesson: false,
  lessonId: null,
  lessonQuestions: [],
  difficulty : null,
  category : null,
  error: null,
};

const currentLessonSlice = createSlice({
  name: "currentLesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLesson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFetchedLesson = action.payload.isFetchedLesson;
        state.lessonId = action.payload.lessonId;
        state.lessonQuestions = action.payload.lessonQuestions;
        state.category = action.payload.category,
        state.difficulty = action.payload.difficulty
      })
      .addCase(setLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.isFetchedLesson = true;
        state.error = action.payload?.error || "Failed to set lesson";
      });
  },
});



export const selectCurrentLesson = (state) => state.currentLesson;
export const selectLesson = state => state.currentLesson.lesson;
export const selectIsLoading = (state) => state.currentLesson.isLoading;
export const selectIsFetchedLesson = (state) => state.currentLesson.isFetchedLesson;
export const selectLessonId = (state) => state.currentLesson.lessonId;
export const selectLessonQuestions = (state) => state.currentLesson.lessonQuestions;
export const selectLessonError = (state) => state.currentLesson.error;






export default currentLessonSlice.reducer;
