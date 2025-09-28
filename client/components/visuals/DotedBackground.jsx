// components/DottedBackground.jsx
'use client'
import { useState, useEffect } from 'react';

const DottedBackground = ({ 
  children,
  size = 5,
  spacing = 14,
  color = '#99a1af',
  className = '',
}) => {

  const dotStyle = {
    backgroundImage: `radial-gradient(circle, ${color} ${size/2}px, transparent ${size/2}px)`,
    backgroundSize: `${spacing}px ${spacing}px`,
    mask: 'linear-gradient(to bottom right, rgba(0,0,0,0.04), rgba(0,0,0,0.045), transparent 80%)',
    WebkitMask: 'linear-gradient(to bottom right, rgba(0,0,0,0.03), rgba(0,0,0,0.045), transparent 80%)',
  };

  return (
    <div className={`absolute ` + className } style={dotStyle}/>
      
  );
};

export default DottedBackground;

// ===============================================
// USAGE EXAMPLES:
// ===============================================

// 1. Basic usage in a page (pages/index.js or app/page.js)
/*
import DottedBackground from '../components/DottedBackground';

export default function HomePage() {
  return (
    <DottedBackground className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center">Welcome</h1>
        <p className="text-center mt-4">This content is on a dotted background</p>
      </div>
    </DottedBackground>
  );
}
*/

// 2. With custom settings
/*
export default function CustomPage() {
  return (
    <DottedBackground 
      dotSize={6}
      dotSpacing={30}
      dotColor="#ef4444"
      backgroundColor="#f8fafc"
      className="min-h-screen"
      showControls={true}
    >
      <div className="p-8">
        <h1>Custom Dotted Background</h1>
      </div>
    </DottedBackground>
  );
}
*/

// 3. As a section background
/*
export default function SectionExample() {
  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto">
          <h1>Regular Section</h1>
        </div>
      </section>

      <DottedBackground 
        dotColor="#10b981" 
        className="py-16"
      >
        <div className="container mx-auto">
          <h2>Section with dotted background</h2>
          <p>This section has dots!</p>
        </div>
      </DottedBackground>

      <section className="py-16">
        <div className="container mx-auto">
          <h3>Another regular section</h3>
        </div>
      </section>
    </div>
  );
}
*/

// 4. Full page layout with dotted background
/*
import DottedBackground from '../components/DottedBackground';

export default function Layout({ children }) {
  return (
    <DottedBackground 
      dotSize={3}
      dotSpacing={25}
      dotColor="#6366f1"
      backgroundColor="#ffffff"
      className="min-h-screen"
    >
      <nav className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">My App</h1>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </DottedBackground>
  );
}
*/

// 5. Card with dotted background
/*
export default function CardExample() {
  return (
    <div className="p-8">
      <DottedBackground 
        dotSize={2}
        dotSpacing={15}
        dotColor="#94a3b8"
        backgroundColor="#f1f5f9"
        className="rounded-lg p-6 max-w-md mx-auto"
      >
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">This card has a subtle dotted background</p>
      </DottedBackground>
    </div>
  );
}
*/