import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import AnimatedTitle from "./AnimatedTitle";
import StarsBackground from "./StarsBackground";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const CARDS = [
  {
    id: "c1",
    number: "01",
    icon: "🚀",
    title: "Registration Opens",
    date: "18th March",
    desc: "Kick off your journey — form your team and sign up for HackZion V3.",
    colorA: "#00f5ff",
    colorB: "#0077ff",
    side: "left",
  },
  {
    id: "c2",
    number: "02",
    icon: "⏳",
    title: "Registration Closes",
    date: "2nd April",
    desc: "Last chance to get your team on the list. Don't miss out.",
    colorA: "#a78bfa",
    colorB: "#7c3aed",
    side: "right",
  },
  {
    id: "c3",
    number: "03",
    icon: "📋",
    title: "Shortlist Announced",
    date: "4th April",
    desc: "Selected teams revealed. Check if you made the cut!",
    colorA: "#34d399",
    colorB: "#059669",
    side: "left",
  },
  {
    id: "c4",
    number: "04",
    icon: "💳",
    title: "Payment Deadline",
    date: "7th April",
    desc: "Confirm your spot with payment to secure your place at the event.",
    colorA: "#fbbf24",
    colorB: "#d97706",
    side: "right",
  },
  {
    id: "c5",
    number: "05",
    icon: "🏆",
    title: "Hackathon Day",
    date: "9th & 10th April",
    desc: "24 hours of building, breaking, and innovating. May the best team win.",
    colorA: "#f472b6",
    colorB: "#db2777",
    side: "left",
  },
];

const TimelineCard = ({ number, icon, title, date, desc, colorA, colorB, side }) => {
  return (
    <div
      className={`w-full md:w-[45%] group ${
        side === "right" ? "md:ml-auto" : "md:mr-auto"
      }`}
    >
      <div
        className="relative rounded-2xl p-px transition-all duration-300 group-hover:scale-[1.03]"
        style={{
          background: `linear-gradient(135deg, ${colorA}, ${colorB})`,
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
          style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})` }}
        />

        {/* Card body */}
        <div className="relative bg-[#090912] rounded-2xl px-6 py-8 md:px-8 md:py-10 overflow-hidden">
          {/* Top streak */}
          <div
            className="absolute top-0 left-1/4 w-1/2 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${colorA}, transparent)` }}
          />
          {/* Bottom corner accent */}
          <div
            className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-10"
            style={{ background: `radial-gradient(circle, ${colorA}, transparent)` }}
          />

          {/* Number badge */}
          <span
            className="absolute top-4 right-5 text-[10px] font-bold tracking-widest font-mono opacity-50"
            style={{ color: colorA }}
          >
            {number}
          </span>

          {/* Icon */}
          <div className="text-3xl mb-4" style={{ filter: `drop-shadow(0 0 8px ${colorA})` }}>
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-white text-sm md:text-base font-bold uppercase tracking-widest mb-3 leading-snug">
            {title}
          </h3>

          {/* Date pill */}
          <span
            className="inline-block text-[10px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 mb-4 border"
            style={{
              color: colorA,
              borderColor: `${colorA}55`,
              background: `${colorA}12`,
            }}
          >
            {date}
          </span>

          {/* Description */}
          <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const wrapperRef = useRef(null);
  const rocketRef = useRef(null);
  const pathRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(rocketRef.current, {
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        motionPath: {
          path: "#motionPath",
          align: "#motionPath",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Path changes based on layout:
  // Desktop: zigzag left-right
  // Mobile: straight vertical line down the center
  const desktopPath = `
    M 500 100
    C 500 200, 200 250, 150 400
    S 800 550, 850 700
    S 200 850, 150 1000
    S 800 1150, 850 1300
    S 200 1450, 150 1600
    L 500 1750
  `;
  const mobilePath = `
    M 500 100
    L 500 1750
  `;

  return (
    <StarsBackground>
      <section
        id="timeline"
        ref={wrapperRef}
        className="relative text-white overflow-hidden"
      >
        {/* Title */}
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <AnimatedTitle
            title="EVENT TIMELINE"
            containerClass="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
          />
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto px-4">
            Follow the journey of HackZion V3 from inception to conclusion
          </p>
        </div>

        {/* Timeline content */}
        <div className="relative container mx-auto px-4 md:px-8 lg:px-16 pb-24">
          {/* Vertical center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          {/* Cards */}
          <div className="flex flex-col gap-10 md:gap-16 relative z-10">
            {CARDS.map((card, i) => (
              <div key={card.id} className="relative flex items-center">
                {/* Center dot (desktop) */}
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-20"
                  style={{
                    background: card.colorA,
                    borderColor: card.colorB,
                    boxShadow: `0 0 12px ${card.colorA}`,
                  }}
                />
                {/* Left dot (mobile) */}
                <div
                  className="md:hidden absolute left-0 top-6 w-3 h-3 rounded-full z-20"
                  style={{
                    background: card.colorA,
                    boxShadow: `0 0 8px ${card.colorA}`,
                  }}
                />

                {/* Card — full width mobile, half width desktop */}
                <div className="w-full pl-6 md:pl-0">
                  <TimelineCard {...card} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-[6px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        {/* Rocket — only visible on desktop where motion path works well */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 1900"
          preserveAspectRatio="none"
        >
          <path
            id="motionPath"
            ref={pathRef}
            d={isMobile ? mobilePath : desktopPath}
            fill="none"
            stroke="transparent"
          />
        </svg>

        <img
          ref={rocketRef}
          src="/img/Rocket.png"
          alt="timeline-rocket"
          className={`absolute z-50 ${isMobile ? "w-8" : "w-10 md:w-14 lg:w-20"}`}
          style={{ top: 0, left: 0 }}
        />
      </section>
    </StarsBackground>
  );
};

export default Timeline;