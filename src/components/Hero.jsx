import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import LanguageSequenceTitle from "./LanguageSequenceTitle";

gsap.registerPlugin(ScrollTrigger);

// Countdown component
const RegistrationCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
  const target = new Date("2026-03-30T23:59:59");

  const tick = () => {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      setExpired(true);
      return;
    }

    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });
  };

  tick();
  const interval = setInterval(tick, 1000);
  return () => clearInterval(interval);
}, []);

  if (expired) {
    return (
      <div className="text-center text-red-400 text-xs font-semibold tracking-widest uppercase mt-1 drop-shadow-lg">
        Registration Closed
      </div>
    );
  }

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-end gap-1 mt-2 pointer-events-auto">
      <p className="text-yellow-200 text-[10px] font-bold tracking-[0.2em] uppercase drop-shadow-md">
        Registration closes in
      </p>

      <div className="flex gap-2 items-center">
        {[
          { label: "D", value: timeLeft.days },
          { label: "H", value: timeLeft.hours },
          { label: "M", value: timeLeft.minutes },
          { label: "S", value: timeLeft.seconds },
        ].map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-1">
            <div className="flex flex-col items-center">

              {/* Bright countdown numbers */}
              <span
                className="text-yellow-300 text-lg font-black tabular-nums leading-none drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {pad(value)}
              </span>

              {/* Labels */}
              <span className="text-white text-[8px] font-bold tracking-widest opacity-80">
                {label}
              </span>
            </div>

            {i < 3 && (
              <span className="text-white text-base font-black opacity-60 -mt-2">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleVideoLoad = () => {
    setLoading(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoError = (e) => {
    console.error("Video loading error:", e);
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
              sequence={["HACKZION", 2500, "ಹ್ಯಾಕ್ಜಿಯನ್", 2500, "हैक्ज़िऔन", 2500]}
              containerClass="special-font hero-heading text-blue-100 text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] text-center"
            />

            <p className="text-blue-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-[0.1em] uppercase opacity-90">
              .V3
            </p>
          </div>
        </div>

        {/* Register button + countdown */}
        <div className="absolute bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
          <button
            onClick={() => navigate("/register")}
            className="special-font hero-heading text-blue-75 text-5xl sm:text-5xl cursor-pointer hover:scale-105 transition-transform bg-transparent border-none text-right"
          >
            R<b>E</b>GISTER <br />
            NOW
          </button>

          <RegistrationCountdown />
          
          {/* Brochure Download Button */}
          <a
            href="/pdf/brochure.pdf"
  download="HackZion-V3-Brochure"
  className="mt-3 flex items-center gap-2 px-4 py-2 bg-yellow-300/90 border border-yellow-200 rounded-lg hover:bg-yellow-400 transition-all duration-200 cursor-pointer group"
>
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-900 group-hover:scale-110 transition-transform"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
  <span className="text-gray-900 text-xs font-general uppercase tracking-wider font-bold">
    Download Brochure
  </span>
</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;