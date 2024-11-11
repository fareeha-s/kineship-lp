import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import screen1 from '../assets/appscreens/screen-1.svg';
import screen2 from '../assets/appscreens/screen-2.svg';
import screen3 from '../assets/appscreens/screen-3-test.svg';
import screen4 from '../assets/appscreens/screen-4-funsies.svg';

const screenshots = [screen1, screen2, screen3, screen4];

export default function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % screenshots.length);
    }, 4000); // Set interval timing to 4 seconds for consistency

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative [transform:translateZ(0)]">
      <img 
        src={screenshots[0]} 
        alt="" 
        className="invisible"
        aria-hidden="true"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      <div className="absolute top-0 left-0 right-0">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={screenshots[currentIndex]}
            alt={`App Screenshot ${currentIndex + 1}`}
            className="rounded-[20px] shadow-2xl absolute top-0 left-0 origin-center"
            style={{ imageRendering: 'crisp-edges' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }} // Consistent timing
          />
        </AnimatePresence>
      </div>

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
