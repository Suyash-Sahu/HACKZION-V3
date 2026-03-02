import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

export function ThreeDCardRing({
  cards = [],
  width = 280,
  height = 350,
  mobileWidth = 160,
  mobileHeight = 200,
  perspective = 1200,
  cardDistance = 220,
  initialRotation = 0,
  animationDuration = 1.4,
  staggerDelay = 0.08,
  hoverOpacity = 0.4,
  containerClassName = "",
  containerHeight = "h-[65vh] sm:h-[70vh] md:h-[60vh]",
  ringClassName = "",
  cardClassName = "",
  backgroundColor = "#0a0a0f",
  draggable = true,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.9,
  mobileCardDistance = 120,
  autoRotate = false,
  autoRotateSpeed = 1,
}) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [showCards, setShowCards] = useState(false);
  const [currentCardDistance, setCurrentCardDistance] = useState(cardDistance);
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const angle = useMemo(() => cards.length > 0 ? 360 / cards.length : 0, [cards.length]);

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth <= mobileBreakpoint;
      const newScale = isMobile ? mobileScaleFactor : 1;
      const newCardDistance = isMobile ? mobileCardDistance : cardDistance;
      const newWidth = isMobile ? mobileWidth : width;
      const newHeight = isMobile ? mobileHeight : height;
      
      setCurrentScale(newScale);
      setCurrentCardDistance(newCardDistance);
      setCurrentWidth(newWidth);
      setCurrentHeight(newHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor, cardDistance, mobileCardDistance, width, height, mobileWidth, mobileHeight]);

  useEffect(() => {
    setShowCards(true);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    let animationFrame;
    const rotationSpeed = autoRotateSpeed * 0.1; // Adjust speed factor
    
    const rotate = () => {
      if (!isDragging.current) { // Only rotate if not being dragged
        const currentValue = rotationY.get();
        rotationY.set(currentValue + rotationSpeed);
      }
      animationFrame = requestAnimationFrame(rotate);
    };
    
    animationFrame = requestAnimationFrame(rotate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [autoRotate, autoRotateSpeed]);

  const handleDragStart = (event) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = event.type.includes("touch") ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    
    if (ringRef.current) {
      ringRef.current.style.cursor = "grabbing";
    }
    
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event) => {
    if (!draggable || !isDragging.current) return;

    const clientX = event.type.includes("touch") ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX.current;
    const rotationDelta = -deltaX * 0.8;
    
    velocity.current = rotationDelta;
    rotationY.set(currentRotationY.current + rotationDelta);
    startX.current = clientX;
    currentRotationY.current = rotationY.get();
  };

  const handleDragEnd = () => {
    if (!draggable || !isDragging.current) return;
    
    isDragging.current = false;
    
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * 15;
    const target = initial + velocityBoost;

    animate(initial, target, {
      type: "spring",
      stiffness: 80,
      damping: 30,
      mass: 1,
      restSpeed: 0.01,
      onUpdate: (latest) => {
        rotationY.set(latest);
        currentRotationY.current = latest;
      },
    });

    velocity.current = 0;
  };

  const cardVariants = {
    hidden: { 
      y: 300, 
      opacity: 0,
      rotateX: -15,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1
    },
  };

  return (
    <div
      ref={containerRef}
      className={`w-full ${containerHeight} flex items-center justify-center overflow-hidden select-none relative ${containerClassName}`}
      style={{
        background: `${backgroundColor}`,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >


      <div
        style={{
          perspective: `${perspective}px`,
          width: `${currentWidth}px`,
          height: `${currentHeight}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={`w-full h-full absolute ${ringClassName}`}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
            willChange: "transform",
          }}
        >
          <AnimatePresence>
            {showCards && cards.map((card, index) => (
              <motion.div
                key={index}
                className={`w-full h-full absolute overflow-hidden ${cardClassName}`}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  rotateY: index * -angle,
                  z: -currentCardDistance * currentScale,
                  transformOrigin: `50% 50% ${currentCardDistance * currentScale}px`,
                  borderRadius: "20px",
                  boxShadow: hoveredIndex === index 
                    ? "0 30px 60px -15px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  transition: "box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "transform, opacity",
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ 
                  opacity: 1, 
                  scale: 1.08, 
                  z: -currentCardDistance * currentScale - 60,
                  rotateX: 2,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  } 
                }}
                onHoverStart={() => {
                  if (isDragging.current || !ringRef.current) return;
                  setHoveredIndex(index);
                  
                  requestAnimationFrame(() => {
                    Array.from(ringRef.current.children).forEach((cardEl, i) => {
                      if (i !== index) {
                        cardEl.style.opacity = `${hoverOpacity}`;
                        cardEl.style.filter = "blur(3px) brightness(0.7)";
                        cardEl.style.transition = "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
                      }
                    });
                  });
                }}
                onHoverEnd={() => {
                  if (isDragging.current || !ringRef.current) return;
                  setHoveredIndex(null);
                  
                  requestAnimationFrame(() => {
                    Array.from(ringRef.current.children).forEach((cardEl) => {
                      cardEl.style.opacity = `1`;
                      cardEl.style.filter = "blur(0px) brightness(1)";
                      cardEl.style.transition = "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
                    });
                  });
                }}
              >
                {/* Enhanced gloss overlay with animation */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.08) 100%)",
                    mixBlendMode: "overlay",
                  }}
                  animate={hoveredIndex === index ? {
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  } : {}}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Glow effect on hover */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                )}
                
                {/* Card content */}
                <div className="w-full h-full relative" style={{ 
                  borderRadius: "20px",
                  overflow: "hidden"
                }}>
                  {card}
                </div>
                
                {/* Enhanced bottom gradient */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)",
                  }}
                />

                {/* Edge highlight */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderRadius: "20px",
                    border: "1px solid transparent",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05)) border-box",
                    WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      


      
      
    </div>
  );
}

// Demo component with sample cards
export default function Demo() {
  const sampleCards = [
    <div className="w-full h-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center text-white font-bold text-2xl">
      Card 1
    </div>,
    <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 flex items-center justify-center text-white font-bold text-2xl">
      Card 2
    </div>,
    <div className="w-full h-full bg-gradient-to-br from-pink-600 via-pink-700 to-rose-800 flex items-center justify-center text-white font-bold text-2xl">
      Card 3
    </div>,
    <div className="w-full h-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center text-white font-bold text-2xl">
      Card 4
    </div>,
    <div className="w-full h-full bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 flex items-center justify-center text-white font-bold text-2xl">
      Card 5
    </div>,
  ];

  return (
    <div className="w-full h-screen">
      <ThreeDCardRing cards={sampleCards} />
    </div>
  );
}