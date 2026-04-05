import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StarsBackground from "./StarsBackground";

const CATEGORIES = [
  { id: "iot", label: "IOT" },
  { id: "aiml", label: "AI/ML" },
  { id: "cybersecurity", label: "Cyber Security" },
  { id: "open-innovation", label: "Open Innovation" },
];

const RESULTS = {
  iot: {
    selected: [
      { team: "Vision X", college: "AMC Engineering College" },
      { team: "Team Blenders", college: "Vidya Vardhaka College of Engineering" },
      { team: "Event Horizon", college: "AMC Engineering College" },
      { team: "RTX 4050", college: "AMC Engineering College" },
      { team: "Incredia", college: "RNS Institute of Technology" },
      { team: "TEAM CRUSADERS", college: "AMC Engineering College" },
      { team: "Trinity", college: "AMC Engineering College" },
      { team: "Rhythm", college: "T John Institute of Technology" },
      { team: "IoT Legion's", college: "Dayananda Sagar College of Engineering" },
      { team: "Teamcursor101", college: "AMC Engineering College" },
    ],
    waitlist: [
      { team: "Blooming4ever", college: "JNNCE" },
    ],
  },
  aiml: {
    selected: [
      { team: "Tokenizers", college: "Ballari Institute of Technology and Management" },
      { team: "Neural Knights", college: "SRMIST" },
      { team: "Team SPY", college: "The Oxford College of Engineering" },
      { team: "BYTE_FORCE", college: "SJBIT" },
      { team: "Hackzemon", college: "K S Institute of Technology" },
      { team: "Spiddy", college: "BMS Institute of Technology and Management" },
      { team: "Team Prajna", college: "Garden City University" },
      { team: "BrainStack", college: "Nagarjuna College of Engineering and Technology" },
      { team: "CodeShinobis", college: "East West College of Engineering" },
      { team: "VitalSync", college: "AMC Engineering College" },
    ],
    waitlist: [
      { team: "WAKANDA'S VISION", college: "CMR Institute of Technology" },
      { team: "Pulse", college: "Sapthagiri College of Engineering" },
      { team: "HELIX", college: "Malnad College of Engineering" },
      { team: "Spirit Link", college: "Rathinam Institute of Technology" },
      { team: "VISIONAUTS", college: "AMC Engineering College" },
    ],
  },
  cybersecurity: {
    selected: [
      { team: "BinaryBrains", college: "Nagarjuna College of Engineering and Technology" },
      { team: "Madhwa", college: "Shri Madhwa Vadiraja Institute of Technology & Management" },
      { team: "Algorithmics", college: "AMC Engineering College" },
      { team: "Crib Exchanges", college: "City Engineering College" },
      { team: "Cyber Kavach", college: "Babu Banarasi Das University Lucknow" },
      { team: "Vervain", college: "AMC Engineering College" },
      { team: "Team Dhurandhar", college: "AMC Engineering College" },
      { team: "Potato Rangers", college: "New Horizon College of Engineering" },
      { team: "4code", college: "K S Institute of Technology" },
      { team: "Firewall", college: "KSIT" },
    ],
    waitlist: [
      { team: "Devrush", college: "Adithya College of Engineering and Technology" },
      { team: "InnoX", college: "AMC Engineering College" },
      { team: "Space Syntax", college: "AMC Engineering College" },
      { team: "CodeX", college: "AMC Engineering College" },
      { team: "Hack-It-Up", college: "AMC Engineering College" },
      { team: "Code Crafters", college: "AMC Engineering College" },
    ],
  },
  "open-innovation": {
    selected: [
      { team: "VulnixAI", college: "KIT - Kalaignar Karunanidhi Institute of Technology" },
      { team: "CodeVortex", college: "Brindavan College of Engineering" },
      { team: "CODEBLASTERS", college: "Dhanalakshmi Srinivasan Engineering College" },
      { team: "INTRAVA", college: "Jawaharlal Nehru National College of Engineering" },
      { team: "Hexel Studio", college: "AMC Engineering College" },
      { team: "Team DSA", college: "KIT - Kalaignar Karunanidhi Institute of Technology" },
      { team: "Mossaic", college: "Presidency University" },
      { team: "TURN TIDES", college: "NMAMIT Institute of Technology" },
      { team: "Code Ninjas", college: "Dr. Ambedkar Institute of Technology" },
      { team: "SheSquad", college: "East Point College of Engineering and Technology" },
    ],
    waitlist: [
      { team: "Hackoholics", college: "AMC Engineering College" },
      { team: "Triveni", college: "AMC Engineering" },
      { team: "VibeCoders", college: "AMC Engineering College" },
      { team: "Code Blazers", college: "Dhanalakshmi Srinivasan Engineering College" },
      { team: "Nexora", college: "G M Institute of Technology" },
      { team: "TECH KANNADIGAS", college: "AMC Engineering College" },
    ],
  },
};

const Results = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("iot");

  const current = RESULTS[activeCategory];

  return (
    <StarsBackground>
      <div className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="w-full max-w-2xl mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-blue-50/50 hover:text-blue-50 font-general text-sm uppercase tracking-wider transition-colors mb-4 flex items-center gap-2"
          >
            <span>&larr;</span> Back to Home
          </button>
          <div className="flex items-center gap-4">
            <img
              src="/img/hackzion logo.png"
              alt="Hackzion Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
            <div>
              <h1 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-blue-75 uppercase">
                Results
              </h1>
              <p className="text-blue-50/50 font-general text-sm mt-2">
                HACKZION V3 — Shortlisted Teams
              </p>
            </div>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="w-full max-w-2xl mb-6">
          <div className="reg-card border border-violet-300/30 bg-violet-300/5">
            <div className="flex items-center gap-2 mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-300 flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <h2 className="font-zentry text-lg font-black text-violet-300 uppercase tracking-wider">
                Important Instructions
              </h2>
            </div>
            <ul className="space-y-3 font-general text-sm text-blue-50/80">
              <li className="flex items-start gap-2">
                <span className="text-violet-300 mt-0.5">•</span>
                <span>
                  <span className="text-blue-50 font-bold">Selected teams</span> must complete their payment of{" "}
                  <span className="text-violet-300 font-bold">₹1000</span> by{" "}
                  <span className="text-violet-300 font-bold">April 6th, 11:59 PM (Midnight)</span> to confirm participation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-300 mt-0.5">•</span>
                <span>
                  Payment details have been sent to the <span className="text-blue-50 font-bold">Team Lead's registered email</span>. Please check your inbox (and spam/junk folder).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-300 mt-0.5">•</span>
                <span>
                  <span className="text-blue-50 font-bold">Waitlisted teams</span> will be declared on{" "}
                  <span className="text-violet-300 font-bold">April 7th, 12:00 PM (Noon)</span>. If selected from the waitlist, teams must complete payment and attend the hackathon on{" "}
                  <span className="text-violet-300 font-bold">April 9th</span>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-300 mt-0.5">•</span>
                <span>
                  Failure to pay by the deadline may result in your slot being given to a waitlisted team.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-general uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-violet-300 text-white"
                    : "bg-white/5 border border-white/10 text-blue-50/60 hover:bg-white/10 hover:text-blue-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Card */}
        <div className="w-full max-w-2xl pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="reg-card"
            >
              <h2 className="font-zentry text-2xl sm:text-3xl font-black text-blue-75 uppercase mb-6">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </h2>

              {/* Selected Teams */}
              <div className="mb-6">
                <h3 className="font-general text-xs uppercase tracking-wider text-violet-300 font-bold mb-3">
                  Selected Teams
                </h3>
                {current.selected.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {current.selected.map((entry, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 rounded-xl border border-violet-300/30 bg-violet-300/10"
                      >
                        <p className="font-general text-sm font-medium text-blue-75 uppercase tracking-wider">
                          {typeof entry === "string" ? entry : entry.team}
                        </p>
                        {typeof entry !== "string" && entry.college ? (
                          <p className="font-general text-xs text-blue-50/40 mt-0.5">{entry.college}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
                    <p className="font-general text-sm text-blue-50/30 italic">To be announced</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-6" />

              {/* Waitlist */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-general text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Waitlist
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-general uppercase tracking-wider">
                    Declared Apr 7, Noon
                  </span>
                </div>
                {current.waitlist.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {current.waitlist.map((entry, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 rounded-xl border border-amber-400/30 bg-amber-400/10"
                      >
                        <p className="font-general text-sm font-medium text-blue-75 uppercase tracking-wider">
                          {typeof entry === "string" ? entry : entry.team}
                        </p>
                        {typeof entry !== "string" && entry.college ? (
                          <p className="font-general text-xs text-blue-50/40 mt-0.5">{entry.college}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-center">
                    <p className="font-general text-sm text-blue-50/30 italic">To be announced on April 7th, 12:00 PM (Noon)</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </StarsBackground>
  );
};

export default Results;
