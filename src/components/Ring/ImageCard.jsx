import React from 'react';

export function ImageCard({ image, gradient }) {
  const hasImage = !!image;

  return (
    <div
      className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full h-full flex flex-col border border-white/10 overflow-hidden"
      style={
        hasImage
          ? {
              background: gradient || "linear-gradient(135deg, #1a1a2e, #16213e)",
              color: '#fff',
            }
          : {
              background: gradient || "linear-gradient(135deg, #1a1a2e, #16213e)",
              color: "#fff",
            }
      }
    >
      {hasImage && (
        <img
          src={image}
          alt="Gallery"
          className="w-full h-full object-contain rounded-2xl"
          style={{
            objectFit: 'contain', // This ensures the full image is visible without cropping
            background: 'black', // Black background to better display images
          }}
        />
      )}
    </div>
  );
}