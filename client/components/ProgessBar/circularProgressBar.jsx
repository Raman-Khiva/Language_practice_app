// Circular progress indicator
// - Accepts size, strokeWidth, progress (0-100), and color
import React from "react";

const CircularProgress = ({ size = 120, strokeWidth = 10, progress = 0, color = "#34cc3e" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // Tailwind gray-200
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // start from top
        />
      </svg>
      <span className="absolute text-lg font-semibold">{progress}%</span>
    </div>
  );
};

export default CircularProgress;
