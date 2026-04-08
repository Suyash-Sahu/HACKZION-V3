import { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import StarsBackground from "./StarsBackground";

// ─── DATA ───────────────────────────────────────────────────────────────────
const LEADERS = [

    {
    id: "l2",
    role: "Chairman",
    name: "Dr. K.R. Paramahamsa",
    image: "/img/chairman.jpg",
    colorA: "#a78bfa",
    colorB: "#7c3aed",
    featured: true,
  },
  {
    id: "l1",
    role: "Director",
    name: "Dr. Mohan Babu G.N.",
    image: "/img/director.webp",
    colorA: "#00f5ff",
    colorB: "#0077ff",
    featured: true,
  },

  {
    id: "l3",
    role: "Principal",
    name: "Dr. Yuvaraju B N",
    image: "/img/principal.webp",
    colorA: "#34d399",
    colorB: "#059669",
    featured: true,
  },
];

const STAFF = [
    {
    id: "s3",
    role: "Academic Advisor",
    name: "Dr. R Nagaraja",
    image: "/img/academic.webp",
    colorA: "#fb923c",
    colorB: "#ea580c",
  },
  {
    id: "s1",
    role: "Vice Principal",
    name: "Dr. G Shivakumar",
    image: "/img/vice principal.webp",
    colorA: "#fbbf24",
    colorB: "#d97706",
  },
  {
    id: "s2",
    role: "Head of Department",
    name: "Dr. V Mareeswari",
    image: "/img/hod.webp",
    colorA: "#cbf472ff",
    colorB: "#9cdb27ff",
  },

];

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────
const FacultyCard = ({ role, name, image, colorA, colorB, featured = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex flex-col items-center gap-4 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Circular ring wrapper */}
      <div className="relative">
        {/* Conic gradient border ring */}
        <div
          className="relative rounded-full p-[3px] transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `conic-gradient(from 0deg, ${colorA}, ${colorB}, transparent 60%, transparent 80%, ${colorA})`,
          }}
        >
          {/* Spinning arc on hover */}
          <div
            className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              border: `2.5px solid transparent`,
              borderTopColor: colorA,
              borderRightColor: `${colorA}55`,
              animation: hovered ? "spin 3s linear infinite" : "none",
            }}
          />

          {/* Glow halo */}
          <div
            className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-400 -z-10 blur-xl"
            style={{
              background: `radial-gradient(circle, ${colorA}66, ${colorB}44, transparent)`,
            }}
          />

          {/* Photo circle */}
          <div
            className={`relative rounded-full overflow-hidden ${featured ? "w-36 h-36" : "w-28 h-28"}`}
            style={{ background: `linear-gradient(135deg, ${colorA}22, ${colorB}33)` }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 hidden items-center justify-center text-4xl">👤</div>
          </div>
        </div>

        {/* Corner accent dots at 4 compass points */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const r = featured ? 76 : 60;
          const cx = featured ? 72 : 56;
          return (
            <div
              key={angle}
              className="absolute w-1.5 h-1.5 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{
                background: colorA,
                boxShadow: `0 0 6px ${colorA}`,
                left: cx + r * Math.cos(rad) - 3,
                top: cx + r * Math.sin(rad) - 3,
              }}
            />
          );
        })}
      </div>

      {/* Role pill */}
      <span
        className="inline-block text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1 border"
        style={{
          color: colorA,
          borderColor: `${colorA}55`,
          background: `${colorA}12`,
        }}
      >
        {role}
      </span>

      {/* Name */}
      <h3 className="text-white text-xl font-bold tracking-wide text-center leading-snug">
        {name}
      </h3>
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const Faculty = () => {
  return (
    <StarsBackground>
      <section id="faculty" className="relative text-white overflow-hidden py-16 md:py-24">
        {/* Subtle background orbs */}
        <div
          className="pointer-events-none absolute top-1/4 left-0 w-72 h-72 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #00f5ff, transparent)" }}
        />
        <div
          className="pointer-events-none absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
        />

        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Heading */}
          <div className="text-center mb-4">
            <AnimatedTitle
              title="BRAINS BEHIND THE MISSION"
              containerClass="text-3xl md:text-4xl lg:text-6xl font-bold mb-4"
            />
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4">
              The visionaries and mentors who make HackZion V3 possible.
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 my-10 md:my-14 max-w-xs mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20" />
            <div className="w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#a78bfa]" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Featured leaders row — Director, Chairman, Principal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-14 max-w-4xl mx-auto">
            {LEADERS.map((person) => (
              <FacultyCard key={person.id} {...person} featured />
            ))}
          </div>

          {/* Secondary staff row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {STAFF.map((person) => (
              <FacultyCard key={person.id} {...person} />
            ))}
          </div>
        </div>
      </section>
    </StarsBackground>
  );
};

export default Faculty;