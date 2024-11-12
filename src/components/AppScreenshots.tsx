import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import screen1 from '../assets/appscreens/browser/screen-1.png';
import screen2a from '../assets/appscreens/browser/screen-2a.png';
import screen2b from '../assets/appscreens/browser/screen-2b.png';
import screen3 from '../assets/appscreens/browser/screen-3.png';
import screen4 from '../assets/appscreens/browser/screen-4.png';

const screenshots = [screen1, screen2a, screen2b, screen3, screen4];

export default function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (current === 0) return 1;  // Move quickly from first slide
        if (current === 1) return 2;  // Quick transition between 2a and 2b
        if (current === 2) return 3;  // Move to screen 3 with zoom
        return (current + 1) % screenshots.length;
      });
    }, currentIndex === 0 ? 2000 : currentIndex >= 1 && currentIndex <= 2 ? 1200 : 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative [transform:translateZ(0)] h-[510px] overflow-hidden">
      <img 
        src={screenshots[0]} 
        alt="" 
        className="invisible"
        aria-hidden="true"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      <div className="absolute top-0 left-0 right-0">
        {screenshots.map((screenshot, index) => (
          <motion.img
            key={index}
            src={screenshot}
            alt={`App Screenshot ${index + 1}`}
            className="rounded-[20px] shadow-2xl absolute top-0 left-0 origin-center w-full h-[510px] object-contain mix-blend-normal"
            style={{ imageRendering: 'crisp-edges' }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              scale: currentIndex === 3 && index === 3 ? 1.05 :  // Changed to scale up screen-3
                     currentIndex === 2 && index === 2 ? 1.05 : 1
            }}
            transition={{ 
              duration: (currentIndex === 2 && index === 2) || 
                       (currentIndex === 3 && index === 3) ? 1.2 : 0.8,  // Added longer duration for screen-3
              ease: (currentIndex === 2 || currentIndex === 3) ? "easeOut" : "easeInOut"  // Added easeOut for screen-3
            }}
          />
        ))}
      </div>
    </div>
  );
}
