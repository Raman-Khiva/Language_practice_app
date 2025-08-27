// store/index.js
import { configureStore } from '@reduxjs/toolkit';


import questionsReducer from './slices/questionsSlice';
import userProgressReducer from './slices/userProgressSlice';
import categoriesReducer from './slices/categoriesSlices';
import authReducer from './slices/authSlice';


export const store = configureStore({
  reducer: {
      auth: authReducer,
      questions: questionsReducer,
      categories: categoriesReducer,
      userProgress: userProgressReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});


