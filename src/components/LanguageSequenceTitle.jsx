import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const LanguageSequenceTitle = ({ sequence, containerClass }) => {
  const [currentText, setCurrentText] = useState(sequence[0]);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    
    // Function to update the text and schedule the next update
    const updateSequence = () => {
      // Calculate the next text index (texts are at even indices: 0, 2, 4...)
      currentIndex = (currentIndex + 2) % sequence.length;
      
      // Ensure we're at a text index (even number)
      if (currentIndex % 2 !== 0) {
        currentIndex = (currentIndex + 1) % sequence.length;
      }
      
      // Get the delay for the current text (delay is at the next odd index)
      const delay = sequence[(currentIndex + 1) % sequence.length];
      
      // Update the text
      setCurrentText(sequence[currentIndex]);
      
      // Schedule the next update
      intervalRef.current = setTimeout(updateSequence, delay);
    };
    
    // Set the initial text
    setCurrentText(sequence[0]);
    
    // Start the sequence after the first delay
    intervalRef.current = setTimeout(updateSequence, sequence[1]); // First delay is at index 1
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [sequence]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  // Split the current text into words and lines for the animation
  const renderTextWithAnimation = (text) => {
    return text.split("<br />").map((line, index) => (
      <div
        key={index}
        className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
      >
        {line.split(" ").map((word, idx) => (
          <span
            key={idx}
            className="animated-word"
            dangerouslySetInnerHTML={{ __html: word }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {renderTextWithAnimation(currentText)}
    </div>
  );
};

export default LanguageSequenceTitle;