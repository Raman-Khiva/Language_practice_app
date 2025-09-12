import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const CapabilityCard = ({placing,badgeColor,badge,title,description,points}) => {
  return (
    <div className={`h-screen flex items-center sticky top-0 justify-center            
                    `}
      >
        <div className={`bg-[#ffffff] rounded-2xl w-5xl shadow-[0_0_30px_rgba(0,0,0,0.2)] overflow-hidden  
                         relative
                         `+ placing }
        >
            <div className="flex">
            {/* Left Content Section */}
            <div className="flex-1 p-8 lg:p-10">
                {/* Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full  text-sm font-medium mb-2 ` + badgeColor}>
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
                <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features:</h3>
                <div className="space-y-3">
                    {points.map((point, index) => (
                    <div key={index} className="flex items-center gap-1">
                        {/* <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5"> */}
                        <IoMdCheckmarkCircleOutline className="text-2xl text-green-600" />
                        {/* </div> */}
                        <span className="text-gray-700 leading-relaxed">{point}</span>
                    </div>
                    ))}
                </div>
                </div>
                
                {/* CTA Button */}
                <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-2  rounded-full font-medium hover:bg-gray-800 transition-colors group">
                Learn More
                <GoArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            
            {/* Right Image Section - Skeleton Placeholder */}
            <div className="flex-1 bg-gray-50 p-8 lg:p-12 flex items-center justify-center relative">
                {/* Main skeleton container */}
                <div className="w-full max-w-sm">
                {/* Header skeleton */}
                {/* <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                    <div>
                        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                </div> */}
                
                {/* Main content skeleton */}
                <div className="space-y-4 mb-8">
                    <div className="w-full h-6 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-5/6 h-6 bg-gray-300 rounded animate-pulse"></div>
                    {/* <div className="w-4/5 h-6 bg-gray-300 rounded animate-pulse"></div> */}
                </div>
                
                {/* Feature list skeleton */}
                <div className="space-y-4 mb-8">
                    {[1, 2].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                        <div className="w-6 h-6 bg-blue-200 rounded-full animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                        <div className="w-4/5 h-4 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-3/5 h-3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    ))}
                </div>
                
                {/* Progress section skeleton */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full animate-pulse overflow-hidden">
                    <div className="w-3/4 h-full bg-blue-300 rounded-full animate-pulse"></div>
                    </div>
                </div>
                
                {/* Action button skeleton */}
                <div className="w-full h-12 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-blue-200 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-12 right-12 w-12 h-12 bg-green-200 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-1/2 right-4 w-8 h-8 bg-purple-200 rounded-full animate-pulse opacity-60"></div>
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </div>
            </div>
            </div>
        </div>
      </div>
  )
}

export default CapabilityCard
