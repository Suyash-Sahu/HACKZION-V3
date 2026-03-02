import React from 'react';
import { ThreeDCardRing } from './ThreeDCardRing';
import images from './ProjectList'; // Using the renamed images array

export default function ImageRingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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
          draggable={false}  // Disable dragging for auto-rotation
          backgroundColor="#000000"
          initialRotation={0}
          mobileBreakpoint={768}
          mobileScaleFactor={0.9}
          containerHeight="h-[65vh] sm:h-[70vh] md:h-[60vh]"
          visibleArc={120} // Show only the front 120 degrees
          snapToCenter={false} // Disable snapping for continuous rotation
          autoRotate={true} // Enable auto-rotation
          autoRotateSpeed={1} // Speed of auto-rotation
        />
      </div>
    </div>
  );
}