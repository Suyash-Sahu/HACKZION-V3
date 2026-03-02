import gsap from "gsap";
import { useRef, useState } from "react";

import AnimatedTitle from "./AnimatedTitle";

// BentoTilt component
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const Sponsors = () => {
  return (
    <div id="contact" className="min-h-dvh w-screen bg-black text-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedTitle
            title="PROUD SPONSORS"
            containerClass="mb-6 text-4xl md:text-6xl font-bold"
          />
        </div>

        {/* Sponsors Grid - 3 cards with video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((id) => (
            <BentoTilt 
              key={id}
              className="border-hsla relative overflow-hidden rounded-xl transition-transform duration-300 ease-out bg-gradient-to-br from-gray-800/30 to-gray-900/20 border-gray-600/30"
            >
              <div className="relative z-10 flex size-full items-center justify-center p-6">
                <video
                  src="/videos/banner.mp4"
                  loop
                  muted
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </BentoTilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
