import React from 'react';

const CircularProgressNew = ({ percentage = 65, size = 80, strokeWidth = 8, showLabel = true , fillColor}) => {
  // Calculate the radius and circumference
  percentage = Math.floor(Math.random()*100) // Clamp between 0 and 100
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 1.5; // 1.5 for 270 degrees (3/4 circle)
  
  // Calculate the stroke dash offset based on percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Center coordinates
  const center = size / 2;
  
  // Start angle (top center) and create arc path for 270 degrees
  const startAngle = -135; // Start from top-left
  const endAngle = 135; // End at top-right (270 degrees total)
  
  // Convert angles to radians
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  // Calculate start and end points
  const x1 = center + radius * Math.cos(startRad);
  const y1 = center + radius * Math.sin(startRad);
  const x2 = center + radius * Math.cos(endRad);
  const y2 = center + radius * Math.sin(endRad);
  
  // Create the arc path
  const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 1 1 ${x2} ${y2}`;
  
  return (
    <div className="relative inline-flex items-center justify-center ">
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background arc */}
        <path
          d={pathData}
          fill="none"
          stroke={fillColor || "url(#backgroundGradient)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress arc */}
        <path
          d={pathData}
          fill="none"
          stroke={"#fff"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out bg-[#]"
        //   style={{
        //     filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))'
        //   }}
        />
        
        {/* Gradient definitions */}
        <defs>
          {/* Background gradient */}
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center label */}
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {percentage}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularProgressNew;