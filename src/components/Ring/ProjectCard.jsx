import React from 'react';

export function ImageCard({ image, gradient }) {
  const hasImage = !!image;

  return (
    <div
      className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full h-full flex flex-col border border-white/10 overflow-hidden"
      style={
        hasImage
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: '#fff',
            }
          : {
              background: gradient || "linear-gradient(135deg, #1a1a2e, #16213e)",
              color: "#fff",
            }
      }
    >
      {/* Just the image content, no text or links */}
    </div>
  );
}