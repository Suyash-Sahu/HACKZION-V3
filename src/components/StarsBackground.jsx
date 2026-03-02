import { useEffect, useState } from "react";

const StarsBackground = ({ children }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const totalStars = 500;  // Increased number of stars
    const generatedStars = Array.from({ length: totalStars }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 0.5,  // Slightly varied sizes
      opacity: Math.random() * 0.8 + 0.2,  // Varied opacity for more realistic twinkling
      delay: `${Math.random() * 6}s`,  // Extended animation delay range
    }));

    setStars(generatedStars);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default StarsBackground;