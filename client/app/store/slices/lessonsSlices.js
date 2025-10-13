import { createSlice, createAsyncThunk, current} from "@reduxjs/toolkit"

const baseApi = "http://localhost:5000/api";



export const fetchLessonsData = createAsyncThunk(
  "lessons/fetchLessonsData",
  async (
    { category = "allLessons", targetDifficulties = [0] },
    { getState, rejectWithValue }
  ) => {
    try {
      // -----------------------------------
      // STEP 0: Prepare and extract state
      // -----------------------------------
      console.log(
        "FETCH-LESSONS ▶ INIT",
        { category, targetDifficulties }
      );

      const state = getState();
      console.log("FETCH-LESSONS ▶ STATE (before fetch)", {
        lessonsRecord: state.lessons.lessonsRecord,
        lessonsDataCount: state.lessons.lessonsData?.length ?? 0,
      });

      const lessonsRecord =
        state.lessons.lessonsRecord || [
          { name: "allLessons", recordList: Array(12).fill(0) },
        ];
      const lessonsData = state.lessons.lessonsData || [];

      // -----------------------------------
      // STEP 1: Check cache
      // -----------------------------------
      const missingDiff = targetDifficulties.filter(
        (diff) => !checkDataExists(lessonsRecord, diff, category)
      );

      console.log("FETCH-LESSONS ▶ STEP 1: Cache check result", {
        targetDifficulties,
        missingDiff,
        cached: targetDifficulties.filter((d) => !missingDiff.includes(d)),
      });

      // -----------------------------------
      // STEP 2: Fetch missing data
      // -----------------------------------
      let fetchedLessons = [];
      let newLessonsRecord = lessonsRecord.map(item => ({
        ...item,
        recordList: [...item.recordList],
      }));


      for (let diff of missingDiff) {

        diff = Number(diff);
        const queryParams =
          category === "allLessons"
            ? `?difficulty=${diff}`
            : `?difficulty=${diff}&category=${category}`;

        console.log(
          `FETCH-LESSONS ▶ STEP 2: Fetching lessons for category=${category}, difficulty=${diff}, query=${queryParams}`
        );

        const response = await fetch(`${baseApi}/lessons${queryParams}`);

        if (!response.ok) {
          console.error("FETCH-LESSONS ▶ STEP 2: HTTP error", response.status);
          return rejectWithValue({
            error: "Some error occurred while fetching lessons!",
          });
        }

        const data = await response.json();
        const lessons = data.lessons || [];

        console.log(
          `FETCH-LESSONS ▶ STEP 2: Received ${lessons.length} lessons for difficulty=${diff}, category=${category}`
        );

        fetchedLessons = [...fetchedLessons, ...lessons];

        // Update lessonsRecord
        const itemIdx = newLessonsRecord.findIndex(
          (item) => item.name === category
        );

        if (itemIdx === -1) {
          console.log(
            "FETCH-LESSONS ▶ STEP 2: Creating new record entry for category",
            category
          );
          const newItem = { name: category, recordList: Array(12).fill(0) };
          newItem.recordList[diff] = 1;
          newLessonsRecord.push(newItem);
        } else {
          console.log(`FETCH-LESSONS ▶ STEP 2: Marking difficulty=${diff} as fetched in record for category=${category}`);
          newLessonsRecord[itemIdx].recordList[diff] = 1;
        }
      }

      // -----------------------------------
      // STEP 3: Merge new lessons with cache
      // -----------------------------------
      const newLessonsData = [...lessonsData, ...fetchedLessons];

      console.log("FETCH-LESSONS ▶ STEP 3: Merge result", {
        updatedLessonsData : newLessonsData,
        updatedRecord: newLessonsRecord,
      });

      return {
        lessonsData: newLessonsData,
        lessonsRecord: newLessonsRecord,
      };
    } catch (error) {
      console.error("FETCH-LESSONS ▶ ERROR", error.message);
      return rejectWithValue({
        error: error.message,
      });
    }
  }
);

const checkDataExists = (lessonsRecord, difficulty, category = 'allLessons') => {
  // Guard invalid difficulty
  if (difficulty < 0 || difficulty > 11) return false;

  
  const allLessonsRecord = lessonsRecord?.find(r => r.name === 'allLessons');
  if (allLessonsRecord && allLessonsRecord.recordList?.[difficulty] !== 0) {
    return true;
  }

  // Find record for given category
  const categoryRecord = lessonsRecord?.find(r => r.name === category);
  if (!categoryRecord) return false;

  const diffStatus = categoryRecord?.recordList?.[difficulty];
  return diffStatus !== 0;
};
 
// New thunk for toggling category with automatic fetching
export const toggleCategoryThunk = createAsyncThunk(
  "lessons/toggleCategory",
  async (difficulty, { getState, dispatch }) => {
    console.log("TOGGLE-CATEGORY ▶ Called with difficulty:", difficulty);
    
    const state = getState().lessons;
    console.log("TOGGLE CATEGORY : this is lessons state : ",state);
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

export const toggleDifficulties = createAsyncThunk(
  "lessons/toggleDifficulties",
  async (targetDifficulties, { getState, dispatch, rejectWithValue }) => {
    try {
      console.log("SYNC-DIFFICULTIES ▶ Called with difficulties:", targetDifficulties);

      let state = getState().lessons;
      const lessonsRecord =
        state.lessonsRecord || [
          { name: "allLessons", recordList: Array(12).fill(0) },
        ];

      // 1️⃣ Check which difficulties are missing
      const missingDifficulties = targetDifficulties.filter(
        (diff) => !checkDataExists(lessonsRecord, diff, "allLessons") // category fixed here
      );
      console.log("SYNC-DIFFICULTIES ▶ Missing difficulties:", missingDifficulties);

      // 2️⃣ Fetch missing difficulties if needed
      if (missingDifficulties.length > 0) {
        await dispatch(
          fetchLessonsData({
            category: "allLessons",
            targetDifficulties: missingDifficulties,
          })
        );
        // Refresh state after fetch
      }

      
      console.log(
        "SYNC-DIFFICULTIES ▶ now going to fetch lessons data"
        
      );

      // 3️⃣ Get updated lessonsData
      const lessonsData = getState().lessons.lessonsData || [];

      console.log(
        "SYNC-DIFFICULTIES ▶ lessonsData:",
        lessonsData
      );
      
      // 4️⃣ Filter by required difficulties
      const currentLessons = lessonsData.filter((lesson) =>
        targetDifficulties.includes(lesson.difficulty-1)
      );

      console.log(
        "SYNC-DIFFICULTIES ▶ Returning currentLessons count:",
        currentLessons.length
      );
      console.log(
        "SYNC-DIFFICULTIES ▶ Returning currentLessons:",
        currentLessons
      );

      return { 
        currentLessons : currentLessons 
      };

    } catch (err) {
      console.log("Errorrrrrrrrrrrrrrrrrrrrr..." , err);
      return rejectWithValue({
        error: err.message,
      });
    }
  }
);




// export const toggleDifficulties = createAsyncThunk(
//   'lessons/toggleDifficulties',
//   async (targetDifficulties , { getState, dispatch,rejectWithValue }) => {
//     try{
//     console.log("SYNC-DIFFICULTIES ▶ Called with difficulties:", targetDifficulties);
    
//     const state = getState().lessons;
//     let { selectedDifficulties, lessonsData, lessonsRecord, currentLessonsRecord } = state;

//     if(!selectedDifficulties){
//       selectedDifficulties = [];
//     }
    
//     // Ensure targetDifficulties is an array
//     const newSelectedDifficulties = targetDifficulties
    
//     console.log("SYNC-DIFFICULTIES ▶ Target difficulties:", newSelectedDifficulties);
//     console.log("SYNC-DIFFICULTIES ▶ Current difficulties:", selectedDifficulties);
    
//     // Check which difficulties need to be fetched
//     const missingDifficulties = [];
//     const availableDifficulties = [];
    
//     if (newSelectedDifficulties.length === 0) {
//       // Default to difficulty 1 when none selected
//       if (!checkDifficultyExists(lessonsData, lessonsRecord, 1)) {
//         missingDifficulties.push(1);
//       } else {
//         availableDifficulties.push(1);
//       }
//     } else {
//       newSelectedDifficulties.forEach(diff => {
//         if (checkDifficultyExists(lessonsData, lessonsRecord, diff)) {
//           availableDifficulties.push(diff);
//         } else {
//           missingDifficulties.push(diff);
//         }
//       });
//     }
    
//     console.log("SYNC-DIFFICULTIES ▶ Available difficulties:", availableDifficulties);
//     console.log("SYNC-DIFFICULTIES ▶ Missing difficulties:", missingDifficulties);
    
//     // Fetch missing difficulties sequentially
//     if (missingDifficulties.length > 0) {
//       console.log("SYNC-DIFFICULTIES ▶ Fetching missing difficulties sequentially:", missingDifficulties);
      
//       for (const difficulty of missingDifficulties) {
//         try {
//           await dispatch(fetchLessons({ 
//             difficulty : difficulty 
//           })).unwrap();
//           console.log(`SYNC-DIFFICULTIES ▶ Successfully fetched difficulty ${difficulty}`);
//         } catch (error) {
//           console.error(`SYNC-DIFFICULTIES ▶ Error fetching difficulty ${difficulty}:`, error);
//           // Continue with other difficulties even if one fails
//         }
//       }
//     }
    
//     // Get updated state after all fetches
//     const updatedState = getState().lessons;
//     const updatedLessonsData = updatedState.lessonsData;
    
//     // Filter current lessons from updated data
//     let currentLessons = [];
//     const targetDiffs = newSelectedDifficulties.length === 0 ? [1] : newSelectedDifficulties;
    
//     currentLessons = updatedLessonsData.filter(item => 
//       targetDiffs.includes(item.difficulty)
//     );
    
//     console.log("SYNC-DIFFICULTIES ▶ Final current lessons count:", currentLessons.length);
    
//     return {
//       selectedDifficulties: newSelectedDifficulties,
//       currentLessons : currentLessons
//     };
//   }catch(err){
//     return rejectWithValue({
//       error : err
//     })
//   }
//   }
// );







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

export const toggleCategoryAndDifficulty = createAsyncThunk(
    'lessons/toggleCategoryAndDifficulty',
    async ({targetCategory='allLessons',targetDifficulty=1},{getState,rejectWithValue})=>{
        try{
            console.log("TOGGLE-CATEGORY-AND-DIFFICULTY ▶ Called with category:", targetCategory);
            console.log("TOGGLE-CATEGORY-AND-DIFFICULTY ▶ Called with difficulty:", targetDifficulty);
            
            const state = getState().lessons;
            const { lessonsData } = state;
            
            let currentLessons = [];
            if(targetCategory==='allLessons'){
                currentLessons = lessonsData.filter(item => item.difficulty === targetDifficulty);
            }else{
                currentLessons = lessonsData.filter(item => item.difficulty === targetDifficulty && item.category === targetCategory);
            }
            
            console.log("\n ||||| \n ||||| ");
            console.log("TOGGLE-CATEGORY-AND-DIFFICULTY ▶ currentLessons:", currentLessons);
            
            console.log("TOGGLE-CATEGORY-AND-DIFFICULTY ▶ Filtered lessons count:", currentLessons.length);
            
            return {
              currentLessons : currentLessons,
              
            };
        }catch(error){
            return rejectWithValue({
                error : error
            })
        }
    }
);

export const getAllLessons = createAsyncThunk(
  "lessons/getAllLessons",
  async (_, { getState, rejectWithValue }) => {
    console.log("GET-ALL-LESSONS ▶ Starting to fetch all lessons");
    
    try {
      const state = getState().lessons;
      console.log("GET-ALL-LESSONS ▶ Current state snapshot:", {
        lessonsCount: state.lessonsData?.length || 0,
      
      });
      const { lessonsFetched } = state;
      
      if(lessonsFetched){
        console.log("GET-ALL-LESSONS ▶ Lessons already fetched, skipping API call");
        return rejectWithValue({
          error : "Lessons already fetched",
          lessonsFetched : true
        });
      }

      console.log("GET-ALL-LESSONS ▶ Fetching lessons from API...");
      const startTime = performance.now();
      
      try {
        const res = await fetch("http://localhost:5000/api/lessons/getAllLessons");
        const fetchTime = performance.now() - startTime;
        console.log(`GET-ALL-LESSONS ▶ API response received in ${fetchTime.toFixed(2)}ms`, { 
          status: res.status,
          statusText: res.statusText 
        });
        
        const data = await res.json();
        
        if(data.success === false){
          console.error("GET-ALL-LESSONS ▶ API returned error:", data.error);
          return rejectWithValue({
            error: data.error,
            lessonsFetched: false
          });
        }
        
        console.log(`GET-ALL-LESSONS ▶ Successfully fetched ${data.lessons?.length || 0} lessons`);
        console.log("GET-ALL-LESSONS ▶ Fetched lessons data:", data.lessons);
        return {
          lessonsData: data.lessons,
          lessonsFetched: true
        };
      } catch (error) {
        const errorTime = performance.now() - startTime;
        console.error(`GET-ALL-LESSONS ▶ Failed to fetch lessons after ${errorTime.toFixed(2)}ms:`, error);
        return rejectWithValue({
          error: error.message || 'Failed to fetch lessons',
          lessonsFetched: false
        });
      }
      
    }catch(err){
      return rejectWithValue({
        lessonsFetched : false,
        error : err.message
      })
    }
  }
);

const initialState = {
    lessonsData           :  [], 
    currentLessons        :  [],
    selectedDifficulties :   [],
    currentLessonsRecord  :  {category: null,difficulty: null},
    loading               :  false,
    lessonsRecord         :  [{name: 'allLessons', recordList: Array(12).fill(0)}], // each category has 12 difficulties inculding universal category i.e. 'allLessons'
    error                 :  null,
    hasPendingFetches     :  false,
    lessonsFetched        :  false
}






const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      
      .addCase(getAllLessons.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLessons.fulfilled,(state,action)=>{
        state.loading = false;
        state.lessonsData = action.payload.lessonsData;
        state.lessonsFetched = action.payload.lessonsFetched;
      })
      .addCase(getAllLessons.rejected,(state,action)=>{
        state.loading = false;
        state.lessonsFetched = action.payload.lessonsFetched
        if(action.payload.lessonsFetched === false){
          state.error = action.payload.error
        }
        else {
          state.error = null
        }
      })
      
      //handle toggleCategoryAndDifficulty
      .addCase(toggleCategoryAndDifficulty.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCategoryAndDifficulty.fulfilled,(state,action)=>{
        state.currentLessons = action.payload.currentLessons;
        state.loading = false;
      })
      .addCase(toggleCategoryAndDifficulty.rejected,(state,action)=>{
        state.error = 'Something went wrong'
        state.loading = false;
      })




      //handle fetch lessons data
      .addCase(fetchLessonsData.fulfilled,(state,action)=>{
        state.lessonsData = action.payload.lessonsData
        state.lessonsRecord = action.payload.lessonsRecord
      })

      .addCase(fetchLessonsData.rejected,(state,action)=>{
        state.error = action.payload.error
      })

      // handle toggle difficulties
      .addCase(toggleDifficulties.pending,(state,action)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleDifficulties.fulfilled,(state,action)=>{
        state.currentLessons = action.payload.currentLessons;
        state.loading = false;
      })
      .addCase(toggleDifficulties.rejected,(state,action)=>{
        state.error = action.payload.error;
        state.loading = false;
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
      })
      
  },
});


export const { setSelectedDifficulties, setCurrentLessons } = lessonsSlice.actions;


export const selectLessons               =  (state) => state.lessons;
export const selectLessonsError          =  (state) => state.lessons.error;
export const selectLessonsLoading        =  (state) => state.lessons.loading;
export const selectLessonsData           =  (state) => state.lessons.lessonsData;
export const selectCurrentLessons        =  (state) => state.lessons.currentLessons;
export const selectLessonsRecord         =  (state) => state.lessons.lessonsRecord;
export const selectCurrentLessonsRecord  =  (state) => state.lessons.currentLessonsRecord;
export const selectLessonsFetched        =  (state) => state.lessons.lessonsFetched;




export default lessonsSlice.reducer;


