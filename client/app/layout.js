// layout.js - Updated
'use client'
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthFromLocalStorage, selectIsInitialized } from "./store/slices/authSlice";

const AuthLoader = ({ children }) => {

  console.log('AUTH LOADER : ENTERED')
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    console.log('USEEFFECT : ENTERED');
    dispatch(loadAuthFromLocalStorage());
  }, [dispatch]);

  // Show loading spinner until auth is determined
  if (!isInitialized) {
    console.log('Not intialized yet! showing loader.')
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return children;
};

export default function RootLayout({ children }) {
  console.log('APP STARTED!')
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider store={store}>
          <AuthLoader>
            {/* <Navbar /> */}
            {children}
          </AuthLoader>
        </Provider>
      </body>
    </html>
  );
}