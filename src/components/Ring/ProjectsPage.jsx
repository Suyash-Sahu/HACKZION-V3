import React from 'react';
import { ThreeDCardRing } from './ThreeDCardRing';
import images from './ProjectList'; // Using the renamed images array

export default function ImageRingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="text-center pt-6 pb-3 flex-shrink-0 sm:pt-8 sm:pb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">3D Image Ring</h1>
        <p className="text-sm sm:text-base md:text-lg opacity-75 max-w-2xl mx-auto px-4">
          Interactive 3D image gallery. Drag to rotate and hover over images.
        </p>
      </header>
      
      <div className="flex-grow flex items-center justify-center py-2 sm:py-4">
        <ThreeDCardRing
          cards={images}
          width={350}
          height={280}
          mobileWidth={160}
          mobileHeight={200}
          perspective={1000}
          cardDistance={400}
          mobileCardDistance={150}
          animationDuration={1.2}
          hoverOpacity={0.4}
          draggable={true}
          backgroundColor="#000000"
          initialRotation={0}
          mobileBreakpoint={768}
          mobileScaleFactor={0.9}
          containerHeight="h-[65vh] sm:h-[70vh] md:h-[60vh]"
          visibleArc={120} // Show only the front 120 degrees
          snapToCenter={true} // Enable snapping to center
        />
      </div>
      
      <footer className="text-center pb-4 pt-1 sm:pb-6 sm:pt-2 text-xs sm:text-sm opacity-50 flex-shrink-0">
        <p>Drag to rotate • Hover for details</p>
      </footer>
    </div>
  );
}