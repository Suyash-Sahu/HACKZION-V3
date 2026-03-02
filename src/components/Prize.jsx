import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

import AnimatedTitle from "./AnimatedTitle";

const Prize = () => {
  const frameRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple fade-in animation on mount
    gsap.fromTo(
      "#prize-section",
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -5;
    const rotateY = ((xPos - centerX) / centerX) * 5;

    gsap.to(element, {
      duration: 0.5,
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
    });
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    console.error("Failed to load video");
  };

  return (
    <section
      id="prize-section"
      className="min-h-dvh w-screen bg-black text-blue-50 flex flex-col items-center justify-center py-16 px-4"
    >
      <AnimatedTitle
        title="PRIZE"
        containerClass="mb-12 pointer-events-none mix-blend-difference relative z-10"
      />

      {isLoading && (
        <div className="absolute-center z-30 flex-center w-full h-full bg-black/80">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-6xl mx-auto">
        <div 
          ref={frameRef}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{ height: '600px', maxWidth: '1000px', margin: '0 auto' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseLeave}
          onMouseEnter={handleMouseLeave}
        >
          <video
            src="/videos/Prize.mp4"
            loop
            muted
            autoPlay
            playsInline
            onCanPlayThrough={handleVideoLoad}
            onError={handleVideoError}
            className="absolute left-0 top-0 size-full object-cover object-center"
            style={{ display: isLoading ? 'none' : 'block' }}
          />
          
          <div className="relative z-10 flex size-full items-center justify-center p-5 text-blue-50">
            <h1 className="font-bauhaus text-6xl sm:text-7xl md:text-8xl lg:text-9xl 
                           text-yellow-300 font-bold drop-shadow-[0_0_30px_rgba(250,204,21,1)] 
                           animate-pulse-slow">
              ₹1,20,000
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prize;