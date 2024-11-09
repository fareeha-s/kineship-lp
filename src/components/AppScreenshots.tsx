import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const screenshots = [
  'https://images.unsplash.com/photo-1662695090713-84d14fb0b5ea?w=500&q=80',
  'https://images.unsplash.com/photo-1662695090429-b60d69d05af9?w=500&q=80',
  'https://images.unsplash.com/photo-1662695090654-dd4d9d02da69?w=500&q=80',
  'https://images.unsplash.com/photo-1662695090481-8e0d0508c03b?w=500&q=80',
];

export default function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % screenshots.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[300px] h-[600px]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[20px] pointer-events-none" />
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={screenshots[currentIndex]}
          alt={`App Screenshot ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover rounded-[20px] shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {screenshots.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}