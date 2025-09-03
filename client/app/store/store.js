// store/index.js
import { configureStore } from '@reduxjs/toolkit';


import questionsReducer from './slices/questionsSlice';
import userProgressReducer from './slices/userProgressSlice';
import categoriesReducer from './slices/categoriesSlices';
import authReducer from './slices/authSlice';
import sideBarReducer from './slices/sideBarSlice';
import lessonsReducer from './slices/lessonsSlices';
import currentLessonReducer from './slices/currentLessonSlice'


export const store = configureStore({
  reducer: {
      auth: authReducer,
      questions: questionsReducer,
      categories: categoriesReducer,
      userProgress: userProgressReducer,
      sideBar : sideBarReducer,
      lessons : lessonsReducer,
      currentLesson : currentLessonReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});


