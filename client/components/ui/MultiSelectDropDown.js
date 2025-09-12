"use client";
import { selectLessons, toggleCategoryThunk, removeCategoryThunk } from "@/app/store/slices/lessonsSlices";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MultiSelectDropdown = () => {
  const options = [
    "A1-early", "A1-pro", "A2-early", "A2-pro",
    "B1-early", "B1-pro", "B2-early", "B2-pro",
    "C1-early", "C1-pro", "C2-early", "C2-pro"
  ];
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const lessons = useSelector(selectLessons);
  const dropdownRef = useRef(null);

  const toggleOption = (idx) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((item) => item !== idx));
    } else {
      setSelected([...selected, idx]);
    }
    dispatch(toggleCategoryThunk(idx));
  };

  const removeOption = (idx) => {
    setSelected(selected.filter((item) => item !== idx));
    dispatch(removeCategoryThunk(idx));
  };
  
  useEffect(()=>{
    dispatch(toggleCategoryThunk(1));
  },[dispatch])

  // 🔑 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={dropdownRef} className="min-w-80 max-w-[56rem] relative">
      {/* Dropdown Field */}
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-wrap items-center gap-1 p-2 border rounded-md cursor-pointer min-h-[40px]"
      >
        {selected.length === 0 && (
          <span className="text-gray-400">Select options...</span>
        )}
        {selected.map((item) => (
          <span
            key={item}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {options[item]}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeOption(item+1);
              }}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Dropdown Options */}
      {open && (
        <div className="mt-1 border rounded-md shadow bg-white absolute right-4 p-2 z-50">
          {options.map((option, i) => (
            <div
              key={i+1}
              onClick={() => toggleOption(i+1)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selected.includes(i+1) ? "bg-blue-50" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
