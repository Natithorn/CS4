import React, { useState, useEffect } from 'react';

const ImageComponent = ({ 
  src, 
  fallback, 
  alt, 
  className = "", 
  width, 
  height,
  style = {} 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [src]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // ถ้ามี src และรูปโหลดได้ ใช้รูปภาพ
  if (src && !imageError) {
    return (
      <div className={`image-container ${className}`} style={style}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            ...style
          }}
        />
        {/* Loading spinner */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    );
  }

  // ถ้าไม่มีรูปหรือรูปโหลดไม่ได้ ใช้ fallback (emoji)
  return (
    <div 
      className={`fallback-container flex items-center justify-center ${className}`}
      style={{ 
        fontSize: width ? `${Math.min(width, height || width) * 0.6}px` : '2rem',
        width,
        height,
        ...style
      }}
    >
      <span className="select-none">{fallback}</span>
    </div>
  );
};

// Helper function สำหรับสร้าง image path
export const getImagePath = (category, filename) => {
  // ใช้ import.meta.env.BASE_URL สำหรับ Vite
  const basePath = import.meta.env.BASE_URL || '/';
  return `${basePath}images/${category}/${filename}`;
};

// Helper function สำหรับตรวจสอบว่ามีรูปภาพหรือไม่
export const checkImageExists = async (src) => {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Preload images for better performance
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

export default ImageComponent; 