import React, { useState, useEffect, useRef, useCallback } from 'react';
import AnimatedTitle from './AnimatedTitle';

// Team data with updated images
const teamData = [
  {
    id: 1,
    name: "Suyash Sahu",
    role: "Frontend Developer",
    vehicleType: "Cyber Racer",
    image: "/img/Amongus1.jpeg",
    crewColor: "#FF4655",
    description: "Building interactive UI and animations",
    task: "Fix Wiring ⚡"
  },
  {
    id: 2,
    name: "Aadi Satwik Pandey",
    role: "Backend Developer",
    vehicleType: "Neon Runner",
    image: "/img/Amongus2.jpeg",
    crewColor: "#00B4D8",
    description: "Handling APIs & server logic",
    task: "Upload Data 💾"
  },
  {
    id: 3,
    name: "Tisha",
    role: "UI/UX Designer",
    vehicleType: "Speed Phantom",
    image: "/img/Amongus1.jpeg",
    crewColor: "#C77DFF",
    description: "Designing smooth user experience",
    task: "Align Engine 🔧"
  },
  {
    id: 4,
    name: "G C Trupti",
    role: "Full Stack Developer",
    vehicleType: "Quantum Cruiser",
    image: "/img/Amongus2.jpeg",
    crewColor: "#4CC9F0",
    description: "Managing frontend + backend flow",
    task: "Run Diagnostics 🖥️"
  }
];

// Floating images - only background elements
const floatingImages = [
  { src: "/img/Amongus-bg-remove-1.png", size: 55, initialX: 5, initialY: 15, delay: 0.5, duration: 6 },
  { src: "/img/Amongus-bg-remove-2.png", size: 40, initialX: 88, initialY: 25, delay: 1.2, duration: 8 },
  { src: "/img/Amongus-bg-remove-1.png", size: 70, initialX: 3, initialY: 60, delay: 2, duration: 7 },
  { src: "/img/Amongus-bg-remove-2.png", size: 45, initialX: 90, initialY: 70, delay: 0.8, duration: 5 },
  { src: "/img/Amongus-bg-remove-1.png", size: 50, initialX: 15, initialY: 85, delay: 3, duration: 9 },
  { src: "/img/Amongus-bg-remove-2.png", size: 35, initialX: 80, initialY: 85, delay: 1.5, duration: 6 },
];

// Floating image component
const FloatingImage = ({ src, size, initialX, initialY, delay, duration }) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [rotation, setRotation] = useState(Math.random() * 360);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
      const interval = setInterval(() => {
        setPos({
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 10,
        });
        setRotation(prev => prev + (Math.random() * 40 - 20));
      }, duration * 1000);

      // Randomly hide/show
      const toggleInterval = setInterval(() => {
        setVisible(v => !v);
      }, (Math.random() * 3000 + 2000));

      return () => {
        clearInterval(interval);
        clearInterval(toggleInterval);
      };
    }, delay * 1000);

    return () => clearTimeout(showTimer);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transition: `left ${duration}s ease-in-out, top ${duration}s ease-in-out, opacity 1s ease, transform 0.5s ease`,
        opacity: visible ? 0.85 : 0,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none',
        zIndex: 1,
        filter: 'drop-shadow(0 0 12px rgba(155, 77, 255, 0.8))',
      }}
    >
      <img 
        src={src} 
        alt="Floating element" 
        style={{ width: size, height: size, objectFit: 'contain' }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default function HackZionTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState(null); // 'left' | 'right'
  const [isAnimating, setIsAnimating] = useState(false);
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
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
    }, 600);
  }, [activeIndex, isAnimating]);

  const goNext = () => goTo((activeIndex + 1) % teamData.length, 'left');
  const goPrev = () => goTo((activeIndex - 1 + teamData.length) % teamData.length, 'right');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, isAnimating]);

  const member = teamData[activeIndex];
  const prevMember = prevIndex !== null ? teamData[prevIndex] : null;

  const getSlideStyle = (isCurrent, dir) => {
    if (!isAnimating) return {};
    if (isCurrent) {
      return {
        animation: dir === 'left' ? 'slideInRight 0.55s cubic-bezier(0.4,0,0.2,1) forwards' : 'slideInLeft 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
      };
    } else {
      return {
        animation: dir === 'left' ? 'slideOutLeft 0.55s cubic-bezier(0.4,0,0.2,1) forwards' : 'slideOutRight 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
      };
    }
  };

  return (
    <div id="team" style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 40%, #000000 70%, #000000 100%)',
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(155,77,255,0.4), 0 0 60px rgba(155,77,255,0.15); }
          50% { box-shadow: 0 0 40px rgba(155,77,255,0.8), 0 0 100px rgba(155,77,255,0.3); }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes ventFlicker {
          0%, 90%, 100% { opacity: 1; }
          92%, 96% { opacity: 0.3; }
          94%, 98% { opacity: 0.7; }
        }
        @keyframes neonFlicker {
          0%, 95%, 100% { opacity: 1; }
          96%, 99% { opacity: 0.6; }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        .card-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .vent-flicker {
          animation: ventFlicker 8s ease-in-out infinite;
        }
        .neon-flicker {
          animation: neonFlicker 5s ease-in-out infinite;
        }
        .nav-btn {
          background: rgba(110, 0, 200, 0.25);
          border: 2px solid rgba(155, 77, 255, 0.5);
          border-radius: 50%;
          width: 56px;
          height: 56px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .nav-btn:hover {
          background: rgba(155, 77, 255, 0.4);
          border-color: #c77dff;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(155,77,255,0.6);
        }
        .task-badge {
          background: rgba(155, 77, 255, 0.2);
          border: 1px solid rgba(155, 77, 255, 0.5);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: #c77dff;
          font-family: 'Share Tech Mono', monospace;
        }
      `}</style>

      {/* Stars */}
      {stars.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: Math.random() > 0.7 ? '#c77dff' : 'white',
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Floating Images - Background only */}
      {floatingImages.map((img, i) => (
        <FloatingImage key={i} {...img} />
      ))}

      

      {/* Venting effect */}
      <div className="vent-flicker" style={{
        position: 'absolute', bottom: 0, left: 0, width: '200px', height: '100px',
        background: 'radial-gradient(ellipse at bottom left, rgba(155,77,255,0.25) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '200px', height: '150px',
        background: 'radial-gradient(ellipse at top right, rgba(247, 37, 133, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '48px', paddingBottom: '20px' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '11px',
          letterSpacing: '6px',
          color: '#9B4DFF',
          marginBottom: '8px',
          fontFamily: 'Share Tech Mono, monospace',
        }}>
          
        </div>
        <AnimatedTitle
        title="AMONG US"
        containerClass="mb-12 pointer-events-none mix-blend-difference relative z-10"
      />
        <div style={{
          fontSize: '13px',
          color: 'rgba(199,125,255,0.7)',
          letterSpacing: '4px',
          marginTop: '6px',
          fontFamily: 'Share Tech Mono, monospace',
        }}>
        
        </div>
      </div>

      {/* Main Slider Area */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '20px 16px',
        minHeight: '520px',
      }}>

        {/* Prev Button */}
        <button className="nav-btn" onClick={goPrev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c77dff" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Card Viewport */}
        <div style={{
          position: 'relative',
          width: '340px',
          height: '460px',
          overflow: 'hidden',
          borderRadius: '24px',
        }}>
          {/* Previous card (sliding out) */}
          {prevMember && direction && (
            <div style={{
              position: 'absolute', inset: 0,
              ...getSlideStyle(false, direction),
            }}>
              <MemberCard member={prevMember} isActive={false} />
            </div>
          )}
          {/* Current card (sliding in) */}
          <div style={{
            position: 'absolute', inset: 0,
            ...getSlideStyle(true, direction),
          }}>
            <MemberCard member={member} isActive={true} />
          </div>
        </div>

        {/* Next Button */}
        <button className="nav-btn" onClick={goNext} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c77dff" strokeWidth="2.5">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* Side thumbnails */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', gap: '12px',
        padding: '0 20px 16px',
        overflowX: 'auto',
      }}>
        {teamData.map((m, i) => (
          <button
            key={m.id}
            onClick={() => goTo(i, i > activeIndex ? 'left' : 'right')}
            style={{
              width: '52px', height: '52px',
              borderRadius: '12px',
              border: i === activeIndex ? `2px solid ${m.crewColor}` : '2px solid rgba(155,77,255,0.2)',
              background: i === activeIndex ? `${m.crewColor}22` : 'rgba(20,0,40,0.6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              transform: i === activeIndex ? 'scale(1.15)' : 'scale(1)',
              boxShadow: i === activeIndex ? `0 0 16px ${m.crewColor}88` : 'none',
              flexShrink: 0,
            }}
          >
            <img 
              src={m.image} 
              alt={m.name}
              style={{ width: 34, height: 34, objectFit: 'cover', borderRadius: '8px' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ display: 'none', fontSize: '10px', color: '#c77dff' }}>
              ?
            </div>
          </button>
        ))}
      </div>

      {/* Emergency Meeting Footer */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        paddingBottom: '24px',
        color: 'rgba(155,77,255,0.5)',
        fontSize: '11px',
        letterSpacing: '3px',
        fontFamily: 'Share Tech Mono, monospace',
      }}>
      </div>
    </div>
  );
}

function MemberCard({ member, isActive }) {
  return (
    <div
      className={isActive ? 'card-glow' : ''}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        background: `linear-gradient(160deg, rgba(20,0,45,0.95) 0%, rgba(10,0,25,0.98) 100%)`,
        border: `2px solid ${member.crewColor}55`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top color strip */}
      <div style={{
        height: '5px',
        background: `linear-gradient(90deg, transparent, ${member.crewColor}, transparent)`,
        flexShrink: 0,
      }} />

      {/* Role on top */}
      <div style={{
        padding: '14px 16px 8px',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          background: `${member.crewColor}22`,
          border: `1px solid ${member.crewColor}55`,
          borderRadius: '20px',
          padding: '4px 14px',
          fontSize: '11px',
          letterSpacing: '1px',
          color: member.crewColor,
          fontFamily: 'Share Tech Mono, monospace',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>
          {member.role}
        </div>
        <div style={{
          width: '10px', height: '10px',
          borderRadius: '50%',
          background: member.crewColor,
          boxShadow: `0 0 10px ${member.crewColor}`,
          animation: 'dotPulse 2s ease-in-out infinite',
        }} />
      </div>

      {/* Image area - center */}
      <div style={{
        flex: 1,
        position: 'relative',
        margin: '0 16px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: `radial-gradient(ellipse at center, ${member.crewColor}18 0%, rgba(0,0,0,0.5) 100%)`,
        border: `1px solid ${member.crewColor}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85,
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />

        {/* Fallback placeholder */}
        <div style={{
          display: 'none',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ 
            width: 80, 
            height: 80, 
            background: member.crewColor,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: 'white'
          }}>
            {member.name.charAt(0)}
          </div>
          <div style={{ fontSize: '12px', color: `${member.crewColor}aa`, letterSpacing: '2px' }}>
            MEMBER #{member.id}
          </div>
        </div>

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${member.crewColor}10 1px, transparent 1px), linear-gradient(90deg, ${member.crewColor}10 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(transparent, rgba(10,0,25,0.9))',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Name at bottom */}
      <div style={{
        padding: '12px 16px 14px',
        flexShrink: 0,
      }}>
        <h3 style={{
          margin: '0 0 4px',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '2px',
          color: 'white',
          textShadow: `0 0 20px ${member.crewColor}88`,
          fontFamily: 'Orbitron, monospace',
        }}>
          {member.name}
        </h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="task-badge">TASK: {member.task}</span>
          <span style={{
            fontSize: '11px',
            color: 'rgba(155,77,255,0.6)',
            fontFamily: 'Share Tech Mono, monospace',
          }}>
            {member.description}
          </span>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        height: '4px',
        background: `linear-gradient(90deg, transparent, ${member.crewColor}, transparent)`,
        flexShrink: 0,
      }} />
    </div>
  );
}