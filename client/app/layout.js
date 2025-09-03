// layout.js - Updated
'use client'
import "./globals.css";
// import Navbar from "@/components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthFromLocalStorage, selectIsInitialized, selectIsAuthenticated } from "./store/slices/authSlice";
import {getUserProgress,selectUserProgress}  from './store/slices/userProgressSlice'
// import {fetchLessons,selectLessons}  from './store/slices/lessonsSlices'

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userProgress = useSelector(selectUserProgress);
  // const lessons = useSelector(selectLessons);

  // ---- useEffects always at top ----
  useEffect(() => {
    dispatch(loadAuthFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      if (!userProgress?.isFetched && !userProgress?.isLoading) {
        dispatch(getUserProgress());
      }
    }
  }, [isInitialized, isAuthenticated, userProgress?.isFetched, userProgress?.isLoading, dispatch]);

//   useEffect(() => {
//     dispatch(fetchLessons({ difficulty: 10 }));
// }, [dispatch]);

  // ---- conditional returns after hooks ----
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (!userProgress || userProgress.isLoading || !userProgress.isFetched) {
      return <div className="w-full h-screen grid place-items-center">Fetching user progress...</div>;
    }
  }

  // console.log("LESSONS : ",lessons);

  // if (lessons?.currentLessonsRecord?.difficulty !== 10) {
  //   return (
  //     <div className="w-full h-screen grid place-items-center">
  //       loading lesson
  //     </div>
  //   );
  // }

  // console.log("LESSONS DATA : ",lessons);

  return children;
};


export default function RootLayout({ children }) {
  console.log('APP STARTED!')
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider store={store}>
          <AuthLoader>
            {children}
          </AuthLoader>
        </Provider>
      </body>
    </html>
  );
}