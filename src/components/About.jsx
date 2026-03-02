import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Welcome from "./Welcome";
import ImageRingPage from "./Ring/ImageRingPage";

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

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
          
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => (
  <section id="about-section" className="bg-black pb-52 pt-16">
    <div className="container mx-auto px-3 md:px-10">

      <AnimatedTitle
            title="ABOUT US"
            containerClass="!text-white text-5xl md:text-7xl font-bold text-center w-full"
          />
      <BentoTilt className="border-hsla relative mt-7 mb-3 h-80 w-full overflow-hidden rounded-md md:h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="relative z-10 flex size-full flex-col justify-center p-8 text-blue-50">
          <div className="animate-fade-in-up">
            <p className="font-circular-web text-xl md:text-2xl font-bold mb-4">
              About HackZion V3
            </p>
            <p className="max-w-3xl font-circular-web text-lg opacity-80 leading-relaxed">
              HackZion V.3 is a <span className="font-semibold text-white">24-hour national-level hackathon </span>
              organized by the Department of Computer Science and Engineering, AMC Engineering College, Bengaluru.
              Now in its third edition, the event brings together students, developers, designers, and tech enthusiasts
              from across the country to collaborate, innovate, and build impactful solutions to real-world challenges.
              Participants are encouraged to push beyond boundaries, transform ideas into working prototypes, and
              connect with mentors and industry professionals.
            </p>
          </div>
        </div>
      </BentoTilt>

      <div className="relative w-full overflow-hidden rounded-md md:h-[75vh] lg:h-[80vh]">
        <ImageRingPage />
      </div>

      <div className="px-5 py-10">
        <div className="flex justify-center">
          <AnimatedTitle
            title="TRACKS"
            containerClass="!text-center !text-white"
          />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2">

        <BentoTilt className="bento-tilt_1 md:col-span-1 
  h-[160px] 
  sm:h-[190px] 
  md:h-[220px] 
  lg:h-[250px] 
  xl:h-[280px]">
          <BentoCard
            src="videos/cyber.mp4"
            title={
              <>
                CYBERSECURITY
              </>
            }


          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-1 
  h-[160px] 
  sm:h-[190px] 
  md:h-[220px] 
  lg:h-[250px] 
  xl:h-[280px]">
          <BentoCard
            src="videos/AIML.mp4"
            title={
              <>
                AIML
              </>
            }


          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-1 
  h-[160px] 
  sm:h-[190px] 
  md:h-[220px] 
  lg:h-[250px] 
  xl:h-[280px]">
          <BentoCard
            src="videos/IOT.mp4"
            title={
              <>
                IOT
              </>
            }

          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 md:col-span-1 
  h-[160px] 
  sm:h-[190px] 
  md:h-[220px] 
  lg:h-[250px] 
  xl:h-[280px]">
          <BentoCard
            src="videos/WEB3-BLOCKCHAIN.mp4"
            title={
              <>
                WEB3/BLOCKCHAIN
              </>
            }

          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default About;