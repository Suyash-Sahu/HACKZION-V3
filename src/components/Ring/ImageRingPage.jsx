import React from 'react';
import { ThreeDCardRing } from './ThreeDCardRing';
import images from './ProjectList';

export default function ImageRingPage() {
  return (
    <div className="w-full bg-black text-white flex flex-col">
      <div className="w-full flex-grow flex items-center justify-center py-4 sm:py-6 md:py-8 overflow-hidden">
        <ThreeDCardRing
          cards={images}
          width={350}
          height={280}
          mobileWidth={140}
          mobileHeight={180}
          perspective={1000}
          cardDistance={400}
          mobileCardDistance={200}
          mobileScaleFactor={0.85}
          animationDuration={1.2}
          hoverOpacity={0.4}
          draggable={false}
          backgroundColor="#000000"
          initialRotation={0}
          mobileBreakpoint={768}
          containerHeight="h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh]"
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </div>
    </div>
  );
}