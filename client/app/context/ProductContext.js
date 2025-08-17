"use client";
import React, { useState, useEffect, createContext } from 'react';

export const ProductContext = createContext(null);

const ProductProvider = (props) => {
  const [allData, addNewData] = useState({});
  const [categories, setCategories] = useState({});
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [lessonData, setLessonData] = useState([]);

  // Fetch all categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories from server...");
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
        console.log("Categories fetched successfully:", data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch questions for current category / lesson
  useEffect(() => {
    if (!currentCategory) return; // do nothing if no category selected

    const fetchData = async () => {
      try {
        if (!allData[currentCategory]) {
          const response = await fetch(`http://localhost:5000/api/questions?category=${currentCategory}`);
          const arr = await response.json();
          addNewData(prev => ({ ...prev, [currentCategory]: arr }));
        } else {
          const startInd = (currentLesson - 1) * 10;
          const endInd = startInd + 10;
          setLessonData(allData[currentCategory].slice(startInd, endInd));
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, [currentCategory, currentLesson]);

  return (
    <ProductContext.Provider value={{
      categories,
      allData,
      currentCategory,
      setCurrentCategory,
      currentLesson,
      setCurrentLesson,
      lessonData
    }}>
      {props.children}
    </ProductContext.Provider>
  );
};



export default ProductProvider;
