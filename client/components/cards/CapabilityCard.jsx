import React, { useEffect, useState } from 'react'
import { GoArrowRight } from 'react-icons/go'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const CapabilityCard = ({ badgeColor, badge, title, description, points, index, totalCards }) => {
//   const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

// useEffect(() => {
//   const handleResize = () => setViewportHeight(window.innerHeight);
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);


//   // Calculate scale and position based on scroll and card index
//   const cardPosition = index * viewportHeight;
// const scrollProgress = Math.max(
//   0,
//   Math.min(1, (scrollY - cardPosition) / viewportHeight)
// );

  
  // Scale decreases for cards that are stacked behind
  // const baseScale = 1;
  //   const maxScaleReduction = 0.2; // up to 20% smaller
  //   const scale = baseScale - scrollProgress * maxScaleReduction;

  

  
  // Z-index for proper stacking order
  const zIndex =   index;

  

  return (
    <div 
      className="h-screen w-fit flex items-center sticky top-0 justify-center
                 overflow-x-hidden
      "
      style={{
        zIndex: zIndex,
      
      }}
    >
      <div
        className={`rounded-2xl  overflow-hidden  
                   relative card-bg
                  transition-all duration-300 ease-out
                   w-[70rem] mx-4 h-[36rem]
                   flex items-center justify-between
                   
                   `}
      >
        <div className="flex 
                        w-full h-full
         ">
          {/* Left Content Section */}
          <div className="flex-1 px-10 py04
                          flex flex-col
                          items-start justify-center
          ">
            {/* Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${badgeColor}`}>
              {badge}
            </div>
            
            {/* Heading */}
            <h2 className="text-2xl lg:text-3xl font-[700] text-gray-900 mb-4 leading-tight">
              {title}
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {description}
            </p>
            
            {/* Key Points */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h3>
              <div className="space-y-2">
                {points.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-3">
                    <IoMdCheckmarkCircleOutline className="text-2xl text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Button */}
            <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors group">
              Learn More
              <GoArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Right Image Section - Skeleton Placeholder */}
          <div className='w-[50%] p-5 flex items-center justify-center'>
            <div className='h-[100%] w-[100%] bg-violet-200/50 rounded-lg backdrop-blur-[10rem]'>
              {/* Placeholder for future image/content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapabilityCard