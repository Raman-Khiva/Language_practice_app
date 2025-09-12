import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi'; 

const SingleSelectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('All');

  // Generate values from A1-Early to C2-Pro
  const generateValues = () => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const types = ['Early', 'Basic', 'Int', 'Pro'];
    const values = [];
    
    levels.forEach(level => {
      types.forEach(type => {
        values.push(`${level}-${type}`);
      });
    });
    
    return values;
  };

  const allValues = generateValues();
  
  // Split into 3 columns with 8 values each (4 rows × 2 levels per column)
  const col1 = allValues.slice(0, 8);   // A1-Early to A2-Pro
  const col2 = allValues.slice(8, 16);  // B1-Early to B2-Pro  
  const col3 = allValues.slice(16, 24); // C1-Early to C2-Pro

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
      
      <div className="relative mr-6 py-[2px]">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-1 text-left bg-transparent border-2 border-gray-300/80 rounded-lg shadow-sm hover:border-gray-400
                    cursor-pointer 
                    focus:border-2 focus:border-indigo-700 focus:ring-4 focus:ring-indigo-200
                    transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-lg">{selectedValue}</span>
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
              {/* Universal "All" option */}
              <button
                onClick={() => handleSelect('All')}
                className={`w-full px-3 py-2 text-left rounded-md mb-2 transition-colors duration-150 ${
                  selectedValue === 'All' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                All
              </button>
              
              {/* Three columns layout */}
              <div className="grid grid-cols-3 gap-1">
                {/* Column 1 - A1 & A2 levels */}
                <div className="space-y-1">
                  {col1.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleSelect(value)}
                      className={`w-full px-2 py-1.5 text-xs text-left rounded transition-colors duration-150 ${
                        selectedValue === value
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
                  {col2.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleSelect(value)}
                      className={`w-full px-2 py-1.5 text-xs text-left rounded transition-colors duration-150 ${
                        selectedValue === value
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
                  {col3.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleSelect(value)}
                      className={`w-full px-2 py-1.5 text-xs text-left rounded transition-colors duration-150 ${
                        selectedValue === value
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