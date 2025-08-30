// Circular progress indicator
// - Accepts size, strokeWidth, progress (0-100), and color
import { percent } from "framer-motion";
import React from "react";

const CircularProgress = ({ size = 80, strokeWidth = 8, progress = 0, color = "#56adff" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  let hue;
  if (progress <= 50) {
    // 0-50%: 30 -> 60
    hue = 30 + (progress / 50) * (60 - 30);
  } else {
    // 50-100%: 60 -> 120
    hue = 60 + ((progress - 50) / 50) * (120 - 60);
  }

  // Keep saturation + lightness fixed for vibrancy
  const dynamicColor = `hsl(${hue}, 90%, 45%)`;

  return (
    <div className="flex  items-center justify-center relative">
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
          stroke={dynamicColor}
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
