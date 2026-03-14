import gsap from "gsap";
import { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";

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
    <div id="sponsors" className="w-screen bg-black text-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <AnimatedTitle
            title="PROUD SPONSORS"
            containerClass="mb-6 text-4xl md:text-6xl font-bold"
          />
        </div>

        <div className="flex justify-center mx-auto w-full max-w-6xl">
          <BentoTilt
            className="relative overflow-hidden rounded-xl transition-transform duration-300 ease-out 
            bg-gradient-to-br from-gray-800/30 to-gray-900/20 border border-gray-600/30 
            w-full h-[420px] sm:h-[420px] md:h-[420px] lg:h-[500px]"
          >
            <video
              src="/videos/banner1.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </BentoTilt>
        </div>

      </div>
    </div>
  );
};

export default Sponsors;