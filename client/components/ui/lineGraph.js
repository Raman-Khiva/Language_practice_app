import React from 'react'

const LineGraph = ({ 
  data = [30, 50, 35, 40, 70, 45, 50], // Default 7-day data (0-100 scale)
  width = 390, 
  height = 210,
  showGrid = true,
  showDots = true 
}) => {
  const days = ['23', '24', '25', '26', '27', '28', '29'];
  
  // Chart dimensions
  const margin = { top: 20, right: 20, bottom: 30, left: 30 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  // Calculate positions
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const valueRange = maxValue - minValue || 1; // Avoid division by zero
  
  // Generate points for the line
  const points = data.map((value, index) => {
    const x = margin.left + (index * chartWidth) / (data.length - 1);
    const y = margin.top + ((maxValue - value) / valueRange) * chartHeight;
    return { x, y, value, day: days[index] };
  });
  
  // Helper function to create smooth curves
  const createSmoothPath = (points) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (i === 1) {
        // First curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else if (i === points.length - 1) {
        // Last curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        // Middle curves with smoother transitions
        const prevPoint = points[i - 2] || prev;
        const nextPoint = next;
        
        const cp1x = prev.x + (curr.x - prevPoint.x) * 0.2;
        const cp1y = prev.y + (curr.y - prevPoint.y) * 0.2;
        const cp2x = curr.x - (nextPoint.x - prev.x) * 0.2;
        const cp2y = curr.y - (nextPoint.y - prev.y) * 0.2;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };
  
  // Create smooth paths
  const linePath = createSmoothPath(points);
  
  // Create the filled area path
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - margin.bottom} L ${margin.left} ${height - margin.bottom} Z`;
  
  // Y-axis tick values
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div className=' h-full w-full overflow-hidden rounded-xl flex items-center justify-center
    
    '>
      <svg width="100%%" height="100%" className=" rounded-lg bg-white/20 ">
        
        {/* Grid lines */}
        {showGrid && (
          <g className="grid-lines">
            {/* Horizontal grid lines */}
            {yTicks.map((tick) => {
              const y = margin.top + ((100 - tick) / 100) * chartHeight;
              return (
                <line
                  key={`h-grid-${tick}`}
                  x1={margin.left}
                  y1={y}
                  x2={width - margin.right}
                  y2={y}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Vertical grid lines */}
            {/* {points.map((point, index) => (
              <line
                key={`v-grid-${index}`}
                x1={point.x}
                y1={margin.top}
                x2={point.x}
                y2={height - margin.bottom}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
            ))} */}
          </g>
        )}
        
        {/* Axes */}
        <g className="axes">
          {/* Y-axis */}
          {/* <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke="#374151"
            strokeWidth="2"
          /> */}
          
          {/* X-axis */}
          <line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke="#374151"
            strokeWidth="0.2"
          />
        </g>
        
        {/* Y-axis labels */}
        <g className="y-labels">
          {yTicks.map((tick) => {
            const y = margin.top + ((100 - tick) / 100) * chartHeight;
            return (
              <text
                // className='text-[#]'
                key={`y-label-${tick}`}
                x={margin.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="8"
                fill="#8f8e8e"
              >
                {tick}
              </text>
            );
          })}
        </g>
        
        {/* X-axis labels */}
        <g className="x-labels">
          {points.map((point, index) => (
            <text
              key={`x-label-${index}`}
              x={point.x}
              y={height - margin.bottom + 16}
              textAnchor="middle"
              fontSize="9"
              fill="#8f8e8e"
            >
              {point.day}
            </text>
          ))}
        </g>
        
        {/* Gradient area fill */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7459D9" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#7459D9" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        
        <path
          d={areaPath}
          fill="url(#chartGradient)"
        />
        
        {/* The actual line */}
        <path
          d={linePath}
          stroke="#7459D9"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points (dots) */}
        {showDots && points.map((point, index) => (
          <g key={`dot-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="2"
              fill="white"
              stroke="#7459D9"
              strokeWidth="1"
            />
            {/* Hover effect circle */}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              strokeWidth='2'
              stroke="transparent"
              fill="transparent"
              className="hover:fill-blue-100 hover:stroke-[#7459D9] transition-all cursor-pointer"
            >
              <title>{`${point.day}: ${point.value}`}</title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default LineGraph