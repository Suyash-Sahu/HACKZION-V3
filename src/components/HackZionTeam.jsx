import React, { useState, useEffect, useCallback } from 'react';
import AnimatedTitle from './AnimatedTitle';
import { teamData } from './data/teamData';

const teamGroups = [
  { label: "Student Co-ordinator", color: "#FFD700" },
  { label: "Tech Team", color: "#FF4655" },
  { label: "Design Team", color: "#C77DFF" },
  { label: "Marketing Team", color: "#00B4D8" },
  { label: "Media Team", color: "#4CC9F0" },
];

const floatingImages = [
  { src: "/img/Amongus-bg-remove-1.png", size: 55, initialX: 5,  initialY: 15, delay: 0.5, duration: 6 },
  { src: "/img/Amongus-bg-remove-2.png", size: 40, initialX: 88, initialY: 25, delay: 1.2, duration: 8 },
  { src: "/img/Amongus-bg-remove-1.png", size: 70, initialX: 3,  initialY: 60, delay: 2,   duration: 7 },
  { src: "/img/Amongus-bg-remove-2.png", size: 45, initialX: 90, initialY: 70, delay: 0.8, duration: 5 },
  { src: "/img/Amongus-bg-remove-1.png", size: 50, initialX: 15, initialY: 85, delay: 3,   duration: 9 },
  { src: "/img/Amongus-bg-remove-2.png", size: 35, initialX: 80, initialY: 85, delay: 1.5, duration: 6 },
];

/* ─── Floating crewmate ─────────────────────────────────────── */
const FloatingImage = ({ src, size, initialX, initialY, delay, duration }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [rotation, setRotation] = useState(Math.random() * 360);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
      const move   = setInterval(() => {
        setPos({ x: Math.random() * 80 + 10, y: Math.random() * 70 + 10 });
        setRotation(r => r + (Math.random() * 40 - 20));
      }, duration * 1000);
      const blink  = setInterval(() => setVisible(v => !v), Math.random() * 3000 + 2000);
      return () => { clearInterval(move); clearInterval(blink); };
    }, delay * 1000);
    return () => clearTimeout(showTimer);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      left: `${pos.x}%`,
      top:  `${pos.y}%`,
      transition: `left ${duration}s ease-in-out, top ${duration}s ease-in-out, opacity 1.2s ease, transform 0.6s ease`,
      opacity: visible ? 0.7 : 0,
      transform: `rotate(${rotation}deg)`,
      pointerEvents: 'none',
      zIndex: 1,
      filter: 'drop-shadow(0 0 14px rgba(155,77,255,0.75))',
    }}>
      <img src={src} alt="" style={{ width: size, height: size, objectFit: 'contain' }}
        onError={e => { e.target.style.display = 'none'; }} />
    </div>
  );
};

/* ─── Main component ────────────────────────────────────────── */
export default function HackZionTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex,   setPrevIndex]   = useState(null);
  const [direction,   setDirection]   = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = React.useRef(null);

  const [stars] = useState(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x:        Math.random() * 100,
      y:        Math.random() * 100,
      size:     Math.random() * 2.2 + 0.4,
      delay:    Math.random() * 5,
      duration: Math.random() * 3 + 2,
      isPurple: Math.random() > 0.72,
    }))
  );

  const goTo = useCallback((newIndex, dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
      setDirection(null);
    }, 560);
  }, [activeIndex, isAnimating]);

  const goNext = () => goTo((activeIndex + 1) % teamData.length, 'left');
  const goPrev = () => goTo((activeIndex - 1 + teamData.length) % teamData.length, 'right');

  const handleTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = e => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, isAnimating]);

  const member     = teamData[activeIndex];
  const prevMember = prevIndex !== null ? teamData[prevIndex] : null;

  const getSlideStyle = (isCurrent, dir) => {
    if (!isAnimating) return {};
    return {
      animation: isCurrent
        ? (dir === 'left'  ? 'slideInRight 0.52s cubic-bezier(0.22,1,0.36,1) forwards'
                           : 'slideInLeft  0.52s cubic-bezier(0.22,1,0.36,1) forwards')
        : (dir === 'left'  ? 'slideOutLeft  0.52s cubic-bezier(0.22,1,0.36,1) forwards'
                           : 'slideOutRight 0.52s cubic-bezier(0.22,1,0.36,1) forwards'),
    };
  };

  return (
    <div
      id="team"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'radial-gradient(ellipse at 20% 50%, #0d0025 0%, #050010 50%, #000000 100%)',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Keyframes ── */
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.5); }
        }
        @keyframes slideInRight {
          from { transform: translateX(105%) scale(0.96); opacity: 0; }
          to   { transform: translateX(0)    scale(1);    opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-105%) scale(0.96); opacity: 0; }
          to   { transform: translateX(0)     scale(1);    opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0)    scale(1);    opacity: 1; }
          to   { transform: translateX(-105%) scale(0.96); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0)    scale(1);    opacity: 1; }
          to   { transform: translateX(105%) scale(0.96); opacity: 0; }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(155,77,255,0.25), 0 8px 40px rgba(155,77,255,0.15), 0 0 80px rgba(155,77,255,0.06); }
          50%       { box-shadow: 0 0 0 1px rgba(155,77,255,0.55), 0 8px 60px rgba(155,77,255,0.35), 0 0 120px rgba(155,77,255,0.12); }
        }
        @keyframes ventFlicker {
          0%, 88%, 100% { opacity: 1; }
          91%, 95%      { opacity: 0.25; }
          93%, 97%      { opacity: 0.65; }
        }
        @keyframes statusPulse {
          0%, 100% { transform: scale(1);    opacity: 0.7; }
          50%       { transform: scale(1.6);  opacity: 1;   }
        }
        @keyframes linkedinPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(10,102,194,0.3); }
          50%       { box-shadow: 0 0 16px rgba(10,102,194,0.7); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%);  }
        }
        @keyframes headerFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }

        /* ── Nav buttons ── */
        .nav-btn {
          background: rgba(155,77,255,0.08);
          border: 1px solid rgba(155,77,255,0.3);
          border-radius: 50%;
          width: 44px; height: 44px; min-width: 44px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.15s;
          backdrop-filter: blur(12px);
          flex-shrink: 0; padding: 0;
        }
        @media (min-width: 480px) {
          .nav-btn { width: 54px; height: 54px; min-width: 54px; }
        }
        .nav-btn:hover  { background: rgba(155,77,255,0.22); border-color: #c77dff; box-shadow: 0 0 22px rgba(155,77,255,0.5); }
        .nav-btn:active { transform: scale(0.92); }

        /* ── Task badge ── */
        .task-badge {
          background: rgba(155,77,255,0.12);
          border: 1px solid rgba(155,77,255,0.35);
          border-radius: 100px;
          padding: 3px 10px;
          font-size: 9px;
          letter-spacing: 1px;
          color: #c77dff;
          font-family: 'Share Tech Mono', monospace;
          white-space: nowrap;
          text-transform: uppercase;
        }

        /* ── LinkedIn button ── */
        .linkedin-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(10,102,194,0.12);
          border: 1px solid rgba(10,102,194,0.45);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 10px;
          color: #7ab8e8;
          font-family: 'Share Tech Mono', monospace;
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, color 0.25s, box-shadow 0.25s;
          animation: linkedinPulse 3s ease-in-out infinite;
          letter-spacing: 1px;
          cursor: pointer;
          text-transform: uppercase;
        }
        .linkedin-btn:hover, .linkedin-btn:active {
          background: rgba(10,102,194,0.3);
          border-color: #7ab8e8;
          color: #aad4f5;
          box-shadow: 0 4px 18px rgba(10,102,194,0.45);
        }

        /* ── Swipe hint ── */
        .swipe-hint {
          display: block; text-align: center;
          font-size: 9px; letter-spacing: 3px;
          color: rgba(155,77,255,0.3);
          font-family: 'Share Tech Mono', monospace;
          padding: 4px 0 8px;
        }
        @media (min-width: 480px) { .swipe-hint { display: none; } }

        /* ── Team filter pills ── */
        .team-pill {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 8px; letter-spacing: 1px;
          font-family: 'Share Tech Mono', monospace;
          white-space: nowrap;
          transition: background 0.35s, border-color 0.35s, color 0.35s, box-shadow 0.35s;
          text-transform: uppercase;
        }
        @media (min-width: 480px) { .team-pill { font-size: 9px; padding: 4px 13px; } }

        /* ── Dot nav ── */
        .dot-btn {
          border: none; cursor: pointer; padding: 0;
          height: 6px; border-radius: 100px;
          transition: width 0.35s cubic-bezier(0.22,1,0.36,1),
                      background 0.35s, box-shadow 0.35s;
        }

        /* ── Card scanline overlay ── */
        .scanline-overlay {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
          border-radius: inherit; opacity: 0.04;
        }
        .scanline-overlay::after {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 40%; 
          background: linear-gradient(transparent, rgba(155,77,255,0.6), transparent);
          animation: scanline 6s linear infinite;
        }
      `}</style>

      {/* ── Stars ── */}
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          borderRadius: '50%',
          background: s.isPurple ? '#c77dff' : '#ffffff',
          animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── Floating crewmates ── */}
      {floatingImages.map((img, i) => <FloatingImage key={i} {...img} />)}

      {/* ── Ambient glows ── */}
      <div className="vent-flicker" style={{
        position: 'absolute', bottom: 0, left: 0, width: '300px', height: '200px',
        background: 'radial-gradient(ellipse at bottom left, rgba(155,77,255,0.18) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '250px', height: '200px',
        background: 'radial-gradient(ellipse at top right, rgba(247,37,133,0.12) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '500px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(155,77,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ── Header ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        paddingTop: '48px', paddingBottom: '8px',
        animation: 'headerFloat 4s ease-in-out infinite',
      }}>
        <AnimatedTitle
          title="AMONG US"
          containerClass="mb-12 pointer-events-none mix-blend-difference relative z-10"
        />
      </div>

      {/* ── Team indicator pills ── */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: '18px', padding: '0 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {teamGroups.map(group => {
            const isActive = group.label === teamData[activeIndex]?.team;
            return (
              <div
                key={group.label}
                className="team-pill"
                style={{
                  border:      `1px solid ${group.color}${isActive ? 'bb' : '28'}`,
                  background:  isActive ? `${group.color}18` : 'transparent',
                  color:       isActive ? group.color : `${group.color}38`,
                  fontWeight:  isActive ? 700 : 400,
                  boxShadow:   isActive ? `0 0 12px ${group.color}33` : 'none',
                }}
              >
                {group.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Slider row ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '12px', padding: '0 12px',
      }}>
        {/* ← Prev */}
        <button className="nav-btn" onClick={goPrev} aria-label="Previous">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c77dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Card viewport */}
        <div style={{
          position: 'relative',
          flex: '1 1 auto', maxWidth: '340px',
          height: '480px',
          overflow: 'hidden',
          borderRadius: '28px',
        }}>
          {prevMember && direction && (
            <div style={{ position: 'absolute', inset: 0, ...getSlideStyle(false, direction) }}>
              <MemberCard member={prevMember} isActive={false} />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, ...getSlideStyle(true, direction) }}>
            <MemberCard member={member} isActive={true} />
          </div>
        </div>

        {/* → Next */}
        <button className="nav-btn" onClick={goNext} aria-label="Next">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c77dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* ── Swipe hint ── */}
      <div className="swipe-hint" style={{ marginTop: '10px' }}>← swipe →</div>

      {/* ── Dot indicators ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: '5px', padding: '14px 20px 40px', flexWrap: 'wrap',
      }}>
        {teamData.map((m, i) => (
          <button
            key={m.id}
            className="dot-btn"
            onClick={() => goTo(i, i > activeIndex ? 'left' : 'right')}
            aria-label={m.name}
            style={{
              width:      i === activeIndex ? 24 : 6,
              background: i === activeIndex ? m.crewColor : `${m.crewColor}33`,
              boxShadow:  i === activeIndex ? `0 0 10px ${m.crewColor}99` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Member card ───────────────────────────────────────────── */
function MemberCard({ member, isActive }) {
  return (
    <div
      style={{
        width: '100%', height: '100%',
        borderRadius: '28px', overflow: 'hidden',
        position: 'relative',
        background: `linear-gradient(160deg,
          rgba(18,4,42,0.97) 0%,
          rgba(8,1,22,0.99)  60%,
          rgba(4,0,14,1)     100%)`,
        border: `1px solid ${member.crewColor}40`,
        display: 'flex', flexDirection: 'column',
        animation: isActive ? 'cardGlow 3.5s ease-in-out infinite' : 'none',
        transition: 'border-color 0.4s',
      }}
    >
      {/* ── Scanline overlay ── */}
      <div className="scanline-overlay" />

      {/* ── Top accent bar ── */}
      <div style={{
        height: '3px',
        background: `linear-gradient(90deg, transparent 0%, ${member.crewColor} 40%, ${member.crewColor} 60%, transparent 100%)`,
        flexShrink: 0,
        opacity: 0.9,
      }} />

      {/* ── Team label + status dot ── */}
      <div style={{
        padding: '13px 16px 10px',
        flexShrink: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          background: `${member.crewColor}16`,
          border:     `1px solid ${member.crewColor}45`,
          borderRadius: '100px',
          padding: '4px 13px',
          fontSize: '9px', letterSpacing: '1.2px',
          color: member.crewColor,
          fontFamily: 'Share Tech Mono, monospace',
          fontWeight: 600, textTransform: 'uppercase',
        }}>
          {member.team}
        </div>

        {/* Status cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '8px', letterSpacing: '1px',
            color: `${member.crewColor}80`,
            fontFamily: 'Share Tech Mono, monospace',
            textTransform: 'uppercase',
          }}>
            Active
          </span>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: member.crewColor,
            boxShadow: `0 0 8px ${member.crewColor}cc`,
            animation: 'statusPulse 2.2s ease-in-out infinite',
            flexShrink: 0,
          }} />
        </div>
      </div>

      {/* ── Photo ── */}
      <div style={{
        flex: 1, position: 'relative',
        margin: '0 14px',
        borderRadius: '18px', overflow: 'hidden',
        background: `radial-gradient(ellipse at 50% 30%, ${member.crewColor}20 0%, rgba(0,0,0,0.6) 100%)`,
        border: `1px solid ${member.crewColor}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 0,
      }}>
        <img
          src={member.image}
          alt={member.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
          onError={e => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
          }}
        />

        {/* Fallback avatar */}
        <div style={{
          display: 'none', width: '100%', height: '100%',
          alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '14px',
        }}>
          <div style={{
            width: 72, height: 72, background: `${member.crewColor}33`,
            border: `2px solid ${member.crewColor}66`,
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '26px', color: member.crewColor,
            fontFamily: 'Orbitron, monospace', fontWeight: 700,
          }}>
            {member.name.charAt(0)}
          </div>
          <div style={{
            fontSize: '10px', color: `${member.crewColor}88`,
            letterSpacing: '2px', fontFamily: 'Share Tech Mono, monospace',
          }}>
            CREW #{String(member.id).padStart(3,'0')}
          </div>
        </div>

        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:  `linear-gradient(${member.crewColor}0c 1px, transparent 1px),
                             linear-gradient(90deg, ${member.crewColor}0c 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />

        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50px', height: '50px',
          background: `radial-gradient(ellipse at top right, ${member.crewColor}30 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '70px',
          background: 'linear-gradient(transparent, rgba(8,1,22,0.95))',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Name + task + LinkedIn ── */}
      <div style={{ padding: '12px 16px 10px', flexShrink: 0 }}>
        {/* Name */}
        <h3 style={{
          margin: '0 0 8px', padding: 0,
          fontSize: '15px', fontWeight: 700, letterSpacing: '2px',
          color: '#ffffff',
          textShadow: `0 0 24px ${member.crewColor}88, 0 0 6px ${member.crewColor}44`,
          fontFamily: 'Orbitron, monospace',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {member.name}
        </h3>

        {/* Task badge + LinkedIn */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="task-badge">⬡ {member.task}</span>

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-btn"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#7ab8e8">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* ── Bottom accent bar ── */}
      <div style={{
        height: '3px', marginTop: 'auto',
        background: `linear-gradient(90deg, transparent, ${member.crewColor}70, ${member.crewColor}, ${member.crewColor}70, transparent)`,
        flexShrink: 0,
      }} />
    </div>
  );
}