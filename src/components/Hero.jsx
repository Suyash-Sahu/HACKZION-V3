import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

import LanguageSequenceTitle from "./LanguageSequenceTitle";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoading(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoError = (e) => {
    console.error('Video loading error:', e);
    setLoading(false);
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = () => `videos/hero.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          ref={videoRef}
          src={getVideoSrc()}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        />

        <div className="absolute left-0 top-0 z-40 w-full h-full pointer-events-none">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <LanguageSequenceTitle
              sequence={['HACKZION', 2500, 'ಹ್ಯಾಕಥಾನ್', 2500, 'हैक्ज़िऔन', 2500]}
              containerClass="special-font hero-heading text-blue-100 text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] text-center"
            />
            <p className="text-blue-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-[0.1em] uppercase opacity-90">
  .V3
</p>
          </div>
        </div>

        
        <a  href="https://forms.gle/bcT7WznJWXxTZpXWA"
          target="_blank"
          rel="noopener noreferrer"
          className="special-font hero-heading absolute bottom-5 right-5 z-50 text-blue-75 text-5xl sm:text-5xl cursor-pointer hover:scale-105 transition-transform pointer-events-auto"
        >
          R<b>E</b>GISTER <br />
          NOW
        </a>
      </div>
    </div>
  );
};

export default Hero;