'use client'
import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi'; 
import { useDispatch, useSelector } from 'react-redux';
import { toggleDifficulties, fetchLessonsData,selectLessonsData, selectCurrentLessons } from '@/app/store/slices/lessonsSlices';

const SingleSelectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValueIdx, setSelectedValueIdx] = useState(0);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const lessonsData = useSelector(selectCurrentLessons);

  const generateValues = () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const types = ['Early', 'Pro'];
    const values = [];
    
    levels.forEach(level => {
      types.forEach(type => {
        values.push(`${level}-${type}`);
      });
    });
    
    return values;
  };

  const options = generateValues();
  
  // Split into 3 columns with 4 values each (2 levels × 2 types per column)
  const col1 = options.slice(0, 4);   // A1-Early to A2-Pro
  const col2 = options.slice(4, 8);   // B1-Early to B2-Pro  
  const col3 = options.slice(8, 12);  // C1-Early to C2-Pro

  const handleSelect = (value) => {
    setSelectedValueIdx(value);
    dispatch(toggleDifficulties([value]));
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(toggleDifficulties([selectedValueIdx]));
  }, [dispatch])
  
  // Fixed: Use isOpen instead of open
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }            
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]); // Fixed: changed from 'open' to 'isOpen'


  return (
    <div ref={dropdownRef} className="relative mr-6 py-[2px] w-40">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-[3px] text-left bg-transparent border-2 border-gray-300/80 rounded-lg shadow-sm hover:border-gray-400
                  cursor-pointer 
                  focus:border-2 focus:border-indigo-700 focus:ring-4 focus:ring-indigo-200
                  transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-700 text-lg">{options[selectedValueIdx]}</span>
          <BiChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2">
            {/* Three columns layout */}
            <div className="grid grid-cols-3 gap-1">
              {/* Column 1 - A1 & A2 levels */}
              <div className="space-y-1">
                {col1.map((value, idx) => (
                  <button
                    key={value}
                    onClick={() => handleSelect(idx)}
                    className={`w-full px-2 py-1.5 text-xs text-left rounded transition-colors duration-150 cursor-pointer ${
                      selectedValueIdx === idx
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              {/* Column 2 - B1 & B2 levels */}
              <div className="space-y-1">
                {col2.map((value, idx) => (
                  <button
                    key={value}
                    onClick={() => handleSelect(idx + 4)}
                    className={`w-full px-2 py-1.5 text-xs text-left rounded transition-colors duration-150 cursor-pointer ${
                      selectedValueIdx === idx + 4
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              {/* Column 3 - C1 & C2 levels */}
              <div className="space-y-1">
                {col3.map((value, idx) => (
                  <button
                    key={value}
                    onClick={() => handleSelect(idx + 8)}
                    className={`w-full px-2 py-1.5 text-xs text-left rounded transition-colors duration-150 cursor-pointer ${
                      selectedValueIdx === idx + 8
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropdown;