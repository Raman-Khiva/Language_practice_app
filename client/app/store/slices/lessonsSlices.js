import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const baseApi = "http://localhost:5000/api";

// Fetch lessons with smart caching (existing thunk - unchanged)
export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async ({ category = "allLessons", difficulty }, { getState, rejectWithValue }) => {
    try {
      // -----------------------------------
      // STEP 0: Prepare and extract state
      // -----------------------------------
      difficulty = Number(difficulty);
      const state = getState();
      const lessonsRecord = state.lessons.lessonsRecord || [];
      const lessonsData = state.lessons.lessonsData || [];

      console.log("FETCH-LESSONS ▶ STEP 0: Called with", { category, difficulty });
      console.log("FETCH-LESSONS ▶ STEP 0: Current state snapshot", {
        lessonsRecord,
        lessonsDataCount: lessonsData.length,
      });

      // -----------------------------------
      // STEP 1: Check cache
      // -----------------------------------
      const record = lessonsRecord.find((item) => {
        return (
          (item.name === "allLessons" &&
            item.recordList &&
            item.recordList[difficulty] !== 0) ||
          (item.name === category &&
            item.recordList &&
            item.recordList[difficulty] !== 0)
        );
      });

      if (record) {
        console.log("FETCH-LESSONS ▶ STEP 1: Found in cache", record);

        let requiredLessons = [];
        if (category === "allLessons") {
          requiredLessons = lessonsData.filter(
            (lesson) => lesson.difficulty === difficulty
          );
        } else {
          requiredLessons = lessonsData.filter(
            (lesson) =>
              lesson.difficulty === difficulty && lesson.category === category
          );
        }

        console.log("FETCH-LESSONS ▶ STEP 1: Returning cached lessons", {
          count: requiredLessons.length,
          sample: requiredLessons.slice(0, 2),
        });

        return {
          currentLessons: requiredLessons,
          fromCache: true,
          currentLessonsRecord: { category, difficulty },
        };
      }

      // -----------------------------------
      // STEP 2: Fetch from API
      // -----------------------------------
      console.log("FETCH-LESSONS ▶ STEP 2: Not in cache, fetching from API");

      const queryParams =
        category === "allLessons"
          ? `?difficulty=${difficulty}`
          : `?difficulty=${difficulty}&category=${category}`;

      console.log("FETCH-LESSONS ▶ STEP 2: Fetch URL", `${baseApi}/lessons${queryParams}`);

      const response = await fetch(`${baseApi}/lessons${queryParams}`);

      if (!response.ok) {
        console.error("FETCH-LESSONS ▶ STEP 2: HTTP error", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const lessons = data.lessons || [];

      console.log("FETCH-LESSONS ▶ STEP 2: Received lessons from API", {
        count: lessons.length,
        sample: lessons.slice(0, 2),
      });

      // -----------------------------------
      // STEP 3: Merge lessonsData (avoid duplicates)
      // -----------------------------------
      const existingLessonsSet = new Set(lessonsData.map((lesson) => lesson._id));
      const newLessons = lessons.filter(
        (lesson) => !existingLessonsSet.has(lesson._id)
      );
      const updatedLessonsData = [...lessonsData, ...newLessons];

      console.log("FETCH-LESSONS ▶ STEP 3: Updated lessonsData", {
        prevCount: lessonsData.length,
        newCount: newLessons.length,
        totalCount: updatedLessonsData.length,
      });

      // -----------------------------------
      // STEP 4: Update lessonsRecord for category
      // -----------------------------------
      const updatedLessonsRecord = lessonsRecord.map(item => ({
        ...item,
        recordList: [...item.recordList], // clone inner array too
        }));

        let categoryRecord = updatedLessonsRecord.find(item => item.name === category);

        if (!categoryRecord) {
        categoryRecord = {
            name: category,
            recordList: new Array(12).fill(0),
        };
        updatedLessonsRecord.push(categoryRecord);
        }

        categoryRecord.recordList[difficulty] = lessons.length;

      console.log("FETCH-LESSONS ▶ STEP 4: Updated record for category", {
        category,
        difficulty,
        count: lessons.length,
      });

      // -----------------------------------
      // STEP 5: If allLessons, also update individual categories
      // -----------------------------------
      if (category === "allLessons") {
        console.log("FETCH-LESSONS ▶ STEP 5: Updating individual category records");

        const lessonsByCategory = {};
        lessons.forEach((lesson) => {
          if (!lessonsByCategory[lesson.category]) {
            lessonsByCategory[lesson.category] = 0;
          }
          lessonsByCategory[lesson.category]++;
        });

        Object.entries(lessonsByCategory).forEach(([cat, count]) => {
          let catRecord = updatedLessonsRecord.find((item) => item.name === cat);
          if (!catRecord) {
            catRecord = {
              name: cat,
              recordList: new Array(12).fill(0),
            };
            updatedLessonsRecord.push(catRecord);
            console.log("FETCH-LESSONS ▶ STEP 5: Created new cat record", catRecord);
          }
          catRecord.recordList[difficulty] = count;
          console.log("FETCH-LESSONS ▶ STEP 5: Updated cat record", {
            cat,
            difficulty,
            count,
          });
        });
      }

      // -----------------------------------
      // STEP 6: Return final payload
      // -----------------------------------
      console.log("FETCH-LESSONS ▶ STEP 6: Returning fresh lessons payload", {
        currentLessonsCount: lessons.length,
        updatedLessonsDataCount: updatedLessonsData.length,
        updatedLessonsRecordCount: updatedLessonsRecord.length,
      });

      return {
        currentLessons: lessons,
        fromCache: false,
        updatedLessonsData,
        updatedLessonsRecord,
        currentLessonsRecord: { category, difficulty },
      };
    } catch (error) {
      console.error("FETCH-LESSONS ▶ ERROR", error.message);
      return rejectWithValue({
        message: error.message,
        category,
        difficulty,
      });
    }
  }
);

// Helper function to check if lessons for a difficulty exist in lessonsData
const checkDifficultyExists = (lessonsData, lessonsRecord, difficulty) => {
  // Check in lessonsRecord if this difficulty has been fetched
  const allLessonsRecord = lessonsRecord.find(item => item.name === "allLessons");
  
  if (!allLessonsRecord || allLessonsRecord.recordList[difficulty] === 0) {
    return false;
  }
  
  // Double check in actual data
  const lessonsForDifficulty = lessonsData.filter(lesson => lesson.difficulty === difficulty);
  return lessonsForDifficulty.length > 0;
};

// New thunk for toggling category with automatic fetching
export const toggleCategoryThunk = createAsyncThunk(
  "lessons/toggleCategory",
  async (difficulty, { getState, dispatch }) => {
    console.log("TOGGLE-CATEGORY ▶ Called with difficulty:", difficulty);
    
    const state = getState().lessons;
    const { selectedDifficulties, lessonsData, lessonsRecord, currentLessonsRecord } = state;
    
    // Toggle the difficulty in selectedDifficulties
    const index = selectedDifficulties.indexOf(difficulty);
    let newSelectedDifficulties;
    
    if (index === -1) {
      newSelectedDifficulties = [...selectedDifficulties, difficulty];
      console.log("TOGGLE-CATEGORY ▶ Adding difficulty:", difficulty);
    } else {
      newSelectedDifficulties = selectedDifficulties.filter(diff => diff !== difficulty);
      console.log("TOGGLE-CATEGORY ▶ Removing difficulty:", difficulty);
    }
    
    // Check which difficulties need to be fetched
    const missingDifficulties = [];
    const availableDifficulties = [];
    
    if (newSelectedDifficulties.length === 0) {
      // Default to difficulty 1 when none selected
      if (!checkDifficultyExists(lessonsData, lessonsRecord, 1)) {
        missingDifficulties.push(1); 
      } else {
        availableDifficulties.push(1);
      }
    } else {
      newSelectedDifficulties.forEach(diff => {
        if (checkDifficultyExists(lessonsData, lessonsRecord, diff)) {
          availableDifficulties.push(diff);
        } else {
          missingDifficulties.push(diff);
        }
      });
    }
    
    console.log("TOGGLE-CATEGORY ▶ Available difficulties:", availableDifficulties);
    console.log("TOGGLE-CATEGORY ▶ Missing difficulties:", missingDifficulties);
    
    // Filter current lessons from available data
    let currentLessons = [];
    if (newSelectedDifficulties.length === 0) {
      currentLessons = lessonsData.filter(item => item.difficulty === 1);
    } else {
      currentLessons = lessonsData.filter(item => 
        availableDifficulties.includes(item.difficulty)
      );
    }
    
    // Fetch missing difficulties in parallel
    if (missingDifficulties.length > 0) {
      console.log("TOGGLE-CATEGORY ▶ Fetching missing difficulties:", missingDifficulties);
      
      const fetchPromises = missingDifficulties.map(diff => 
        dispatch(fetchLessons({ 
          category: currentLessonsRecord.category || "allLessons", 
          difficulty: diff 
        }))
      );
      
      // Don't wait for fetches to complete, they will update state when done
      Promise.all(fetchPromises).catch(error => {
        console.error("TOGGLE-CATEGORY ▶ Error fetching missing difficulties:", error);
      });
    }
    
    return {
      selectedDifficulties: newSelectedDifficulties,
      currentLessons,
      hasPendingFetches: missingDifficulties.length > 0
    };
  }
);

// New thunk for removing category with filtering
export const removeCategoryThunk = createAsyncThunk(
  "lessons/removeCategory",
  async (difficulty, { getState }) => {
    console.log("REMOVE-CATEGORY ▶ Called with difficulty:", difficulty);
    
    const state = getState().lessons;
    const { selectedDifficulties, lessonsData } = state;
    
    const newSelectedDifficulties = selectedDifficulties.filter(diff => diff !== difficulty);
    
    let currentLessons = [];
    if (newSelectedDifficulties.length === 0) {
      currentLessons = lessonsData.filter(item => item.difficulty === 1);
    } else {
      currentLessons = lessonsData.filter(item => 
        newSelectedDifficulties.includes(item.difficulty)
      );
    }
    
    console.log("REMOVE-CATEGORY ▶ New selected difficulties:", newSelectedDifficulties);
    console.log("REMOVE-CATEGORY ▶ Filtered lessons count:", currentLessons.length);
    
    return {
      selectedDifficulties: newSelectedDifficulties,
      currentLessons
    };
  }
);

// New thunk for clearing all categories
export const clearAllCategoriesThunk = createAsyncThunk(
  "lessons/clearAllCategories",
  async (_, { getState, dispatch }) => {
    console.log("CLEAR-ALL-CATEGORIES ▶ Called");
    
    const state = getState().lessons;
    const { lessonsData, lessonsRecord, currentLessonsRecord } = state;
    
    // Check if difficulty 1 exists
    if (!checkDifficultyExists(lessonsData, lessonsRecord, 1)) {
      console.log("CLEAR-ALL-CATEGORIES ▶ Difficulty 1 not found, fetching...");
      
      // Fetch difficulty 1 data
      dispatch(fetchLessons({ 
        category: currentLessonsRecord.category || "allLessons", 
        difficulty: 1 
      }));
      
      return {
        selectedDifficulties: [],
        currentLessons: [], // Will be updated when fetch completes
        hasPendingFetches: true
      };
    }
    
    const currentLessons = lessonsData.filter(item => item.difficulty === 1);
    
    console.log("CLEAR-ALL-CATEGORIES ▶ Filtered to difficulty 1, count:", currentLessons.length);
    
    return {
      selectedDifficulties: [],
      currentLessons,
      hasPendingFetches: false
    };
  }
);

const initialState = {
    currentLessons: [],  // required (2,5)
    selectedDifficulties: [], //  (2,4,6)
    currentLessonsRecord: {
        category: null,
        difficulty: null
    },
    loading: false,
    lessonsData: [], // all lessons  (suppose there are lesson of difficulty 1, 2, 3, 4, 5, 6)
    lessonsRecord: [
        {name: 'allLessons', recordList: Array(12).fill(0)}
    ],
    error: null,
    hasPendingFetches: false // Track if there are ongoing fetches
}

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    // Keep these as simple synchronous actions for direct state updates if needed
    setSelectedDifficulties: (state, action) => {
      state.selectedDifficulties = action.payload;
    },
    setCurrentLessons: (state, action) => {
      state.currentLessons = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchLessons
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.fromCache) {
          // Use cache results
          state.currentLessons = action.payload.currentLessons;
        } else {
          // Use fresh API results and update lessonsData
          state.lessonsData = action.payload.updatedLessonsData;
          state.lessonsRecord = action.payload.updatedLessonsRecord;
          
          // Update currentLessons based on current selectedDifficulties
          if (state.selectedDifficulties.length === 0) {
            state.currentLessons = state.lessonsData.filter(item => item.difficulty === 1);
          } else {
            state.currentLessons = state.lessonsData.filter(item =>
              state.selectedDifficulties.includes(item.difficulty)
            );
          }
        }
        state.currentLessonsRecord = action.payload.currentLessonsRecord;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch lessons";
      })
      
      // Handle toggleCategoryThunk
      .addCase(toggleCategoryThunk.fulfilled, (state, action) => {
        state.selectedDifficulties = action.payload.selectedDifficulties;
        state.currentLessons = action.payload.currentLessons;
        state.hasPendingFetches = action.payload.hasPendingFetches || false;
      })
      
      // Handle removeCategoryThunk
      .addCase(removeCategoryThunk.fulfilled, (state, action) => {
        state.selectedDifficulties = action.payload.selectedDifficulties;
        state.currentLessons = action.payload.currentLessons;
      })
      
      // Handle clearAllCategoriesThunk
      .addCase(clearAllCategoriesThunk.fulfilled, (state, action) => {
        state.selectedDifficulties = action.payload.selectedDifficulties;
        state.currentLessons = action.payload.currentLessons;
        state.hasPendingFetches = action.payload.hasPendingFetches || false;
      });
  },
});






export const { setSelectedDifficulties, setCurrentLessons } = lessonsSlice.actions;


export const selectLessons = (state) => state.lessons;
export const selectLoading = (state) => state.lessons.loading;
export const selectLessonsData = (state) => state.lessons.lessonsData;
export const selectCurrentLessons = (state) => state.lessons.currentLessons;
export const selectLessonsRecord = (state) => state.lessons.lessonsRecord;
export const selectCurrentLessonsRecord = (state) => state.lessons.currentLessonsRecord;



export default lessonsSlice.reducer;

// Usage in components:
/*
import { toggleCategoryThunk, removeCategoryThunk, clearAllCategoriesThunk } from './lessonsSlice';

// In your component:
const dispatch = useDispatch();
const { currentLessons, selectedDifficulties, loading, hasPendingFetches } = useSelector(state => state.lessons);

const handleDifficultyToggle = (difficulty) => {
  dispatch(toggleCategoryThunk(difficulty));
};

const handleRemoveDifficulty = (difficulty) => {
  dispatch(removeCategoryThunk(difficulty));
};

const handleClearAll = () => {
  dispatch(clearAllCategoriesThunk());
};
*/