import React from 'react';

const ModernBackground = ({ 
  children, 
  className = "", 
  showContent = true 
}) => { //
  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 ${className}`}>
      
      {/* Floating blur shapes */}
      {/* Shape 1 - Purple ellipse top left */}
      {/* <div 
        className="absolute w-96 h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full top-10 -left-20 blur-3xl opacity-60 animate-pulse" 
        style={{ animationDuration: '4s' }}
      /> */}
      
      {/* Shape 2 - Blue circle top right */}
      {/* <div 
        className="absolute w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full top-1/4 -right-10 blur-3xl opacity-50 " 
        // style={{ animationDuration: '6s', animationDelay: '1s' }}
      /> */}
      
      {/* Shape 3 - Orange ellipse center left */}
      <div 
        className="absolute w-80 h-96 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full top-1/6 left-1/4 blur-3xl opacity-50 -rotate-25" 
       
      />
      
      {/* Shape 4 - Green circle bottom right */}
      {/* <div 
        className="absolute w-72 h-72 bg-gradient-to-tr from-emerald-300 to-teal-400 rounded-full bottom-20 -right-16 blur-3xl opacity-55 animate-pulse" 
        style={{ animationDuration: '7s', animationDelay: '0.5s' }}
      /> */}
      
      {/* Shape 5 - Pink ellipse center */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-l from-pink-200 to-rose-200 rounded-full top-1/3 right-1/4 transform -translate-x-1/2 blur-3xl opacity-35 " 
        // style={{ animationDuration: '8s', animationDelay: '3s' }}
      />
      
      {/* Shape 6 - Violet circle bottom left */}
      <div 
        className="absolute w-96 h-80 bg-gradient-to-br from-violet-300 to-purple-300 rounded-full top-1/6 left-3/5 blur-3xl opacity-40 " 
        // style={{ animationDuration: '6s', animationDelay: '4s' }}
      />
      
      {/* Small accent shapes */}
      {/* <div 
        className="absolute w-32 h-64 bg-gradient-to-b from-indigo-200 to-blue-200 rounded-full top-16 right-1/3 blur-2xl opacity-40 animate-pulse rotate-12" 
        style={{ animationDuration: '9s' }}
      />
       */}
      {/* <div 
        className="absolute w-40 h-20 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full bottom-1/3 left-1/4 blur-2xl opacity-50 animate-bounce -rotate-30" 
        style={{ animationDuration: '10s', animationDelay: '2.5s' }}
      /> */}
      
      {/* Additional micro elements */}
      {/* <div 
        className="absolute w-24 h-24 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full top-3/4 right-1/4 blur-xl opacity-30 animate-pulse" 
        style={{ animationDuration: '12s' }}
      /> */}
      
      {/* <div 
        className="absolute w-16 h-32 bg-gradient-to-b from-blue-100 to-indigo-100 rounded-full top-1/6 left-3/4 blur-xl opacity-35 animate-ping rotate-45" 
        style={{ animationDuration: '8s', animationDelay: '1.5s' }}
      /> */}

      {/* Content area */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {showContent && !children && (
          <div className="bg-white bg-opacity-25 backdrop-blur-sm border border-white border-opacity-30 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-xl">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 text-center">
              Modern Design
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">
              Contemporary background with subtle blurred geometric shapes creating depth 
              and visual interest while maintaining clean aesthetics.
            </p>
            <div className="text-center">
              <button className="inline-block px-8 py-3 bg-white bg-opacity-30 backdrop-blur-sm border border-white border-opacity-50 rounded-full text-gray-700 hover:bg-opacity-40 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
              </button>
            </div>
          </div>
        )}
        
        {children && (
          <div className="w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernBackground;

// Usage examples:

// Example 1: Basic usage with default content
// <ModernBackground />

// Example 2: As a background wrapper with your own content
// <ModernBackground>
//   <div className="max-w-4xl mx-auto">
//     <h1 className="text-6xl font-bold text-white mb-8">Your Content</h1>
//     <p className="text-xl text-gray-200">Your custom content here</p>
//   </div>
// </ModernBackground>

// Example 3: Just the background without any content
// <ModernBackground showContent={false}>
//   {/* Your page content */}
// </ModernBackground>

// Example 4: With custom className
// <ModernBackground className="bg-gradient-to-r from-purple-900 to-blue-900">
//   <YourComponent />
// </ModernBackground>