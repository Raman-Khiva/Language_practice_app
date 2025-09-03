import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"


const baseApi = "http://localhost:5000/api";
// Fetch lessons with smart caching
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


const initialState = {
    currentLessons : [],
    currentLessonsRecord : {
        category : null,
        difficulty : null
    },
    loading : false,
    lessonsData : [],
    lessonsRecord : [
        {name: 'allLessons', recordList: Array(12).fill(0)}
    ],
    error : null
}


const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.fromCache) {
          // ✅ Use cache results
          state.currentLessons = action.payload.currentLessons;
        } else {
            // ✅ Use fresh API results
            state.currentLessons = action.payload.currentLessons;
            state.lessonsData = action.payload.updatedLessonsData;
            state.lessonsRecord = action.payload.updatedLessonsRecord;
        }
        state.currentLessonsRecord = action.payload.currentLessonsRecord;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch lessons";
      });
  },
});



export const selectLessons = (state) => state.lessons;
export const selectLoading = (state) => state.lessons.loading;
export const selectLessonsData = (state) => state.lessons.lessonsData;
export const selectCurrentLessons = (state) => state.lessons.currentLessons;
export const selectLessonsRecord = (state) => state.lessons.lessonsRecord;
export const selectCurrentLessonsRecord = (state) => state.lessons.currentLessonsRecord;

// const initialState = {
//     currentLessons : [],
//     currentLessonsRecord : {
//         category : null,
//         difficulty : null
//     },
//     loading : false,
//     lessonsData : [],
//     lessonsRecord : [
//         {name: 'allLessons', recordList: Array(12).fill(0)}
//     ],
//     error : null
// }


export default lessonsSlice.reducer;

