import React from 'react'
import PerformanceCard from './performaceCards'
import CircularProgressNew from './CircularProgressNew'
const ProgressCardsBar = ({className}) => {
  return (
    <div className={className}
            >
              <PerformanceCard className="bg-amber-200 ">
                <CircularProgressNew fillColor="#fff7c9" />
              </PerformanceCard>
              <PerformanceCard className="bg-blue-300">
                <CircularProgressNew fillColor="#dbeafe" />
              </PerformanceCard>
              <PerformanceCard className="bg-fuchsia-300">
                <CircularProgressNew fillColor="#f5d0fe" />
              </PerformanceCard>
              <PerformanceCard className="bg-orange-200">
                <CircularProgressNew fillColor="#ffedd5" />
              </PerformanceCard>
    </div>
  )
}

export default ProgressCardsBar
