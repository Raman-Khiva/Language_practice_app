"use client";
import React, { useState } from "react";

const MultiSelectDropdown = () => {
  const options = ["A1-early","A1-pro","A2-early","A2-pro","B1-early","B1-pro",];
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const removeOption = (option) => {
    setSelected(selected.filter((item) => item !== option));
  };

  return (
    <div className="min-w-80 max-w-[36rem] relative">
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
            {item}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeOption(item);
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
        <div className="mt-1 border rounded-md shadow bg-white absolute right-4 p-2">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selected.includes(option) ? "bg-blue-50" : ""
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
