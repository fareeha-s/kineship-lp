import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Desktop images
import screen1 from '../assets/appscreens/browser/screen-1.png';
import screen2a from '../assets/appscreens/browser/screen-2a.png';
import screen2b from '../assets/appscreens/browser/screen-2b.png';
import screen3 from '../assets/appscreens/browser/screen-3.png';
import screen4 from '../assets/appscreens/browser/screen-4.png';
// Mobile images (same names, different path)
import mobileScreen1 from '../assets/appscreens/mobile/screen-1.png';
import mobileScreen2a from '../assets/appscreens/mobile/screen-2a.png';
import mobileScreen2b from '../assets/appscreens/mobile/screen-2b.png';
import mobileScreen3 from '../assets/appscreens/mobile/screen-3.png';
import mobileScreen4 from '../assets/appscreens/mobile/screen-4.png';

const desktopScreenshots = [screen1, screen2a, screen2b, screen3, screen4];
const mobileScreenshots = [mobileScreen1, mobileScreen2a, mobileScreen2b, mobileScreen3, mobileScreen4];

export default function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check if it's a touch device or small screen
      const isMobileDevice = 
        window.matchMedia('(max-width: 1024px)').matches ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      
      console.log('Is mobile?', isMobileDevice); // Debug log
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (current === 0) return 1;  // Move quickly from first slide
        if (current === 1) return 2;  // Quick transition between 2a and 2b
        if (current === 2) return 3;  // Move to screen 3 with zoom
        return (current + 1) % desktopScreenshots.length;
      });
    }, currentIndex === 0 ? 2000 : currentIndex >= 1 && currentIndex <= 2 ? 1200 : 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className={`relative [transform:translateZ(0)] ${isMobile ? 'h-[400px]' : 'h-[510px]'} overflow-hidden`}>
      <img 
        src={isMobile ? mobileScreenshots[0] : desktopScreenshots[0]} 
        alt="" 
        className="invisible"
        aria-hidden="true"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      <div className="absolute top-0 left-0 right-0">
        {(isMobile ? mobileScreenshots : desktopScreenshots).map((screenshot, index) => (
          <motion.img
            key={index}
            src={screenshot}
            alt={`App Screenshot ${index + 1}`}
            className={`rounded-[20px] shadow-2xl absolute top-0 left-0 origin-center w-full ${
              isMobile ? 'h-[400px]' : 'h-[510px]'
            } object-contain mix-blend-normal`}
            style={{ imageRendering: 'crisp-edges' }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              scale: currentIndex === 3 && index === 3 ? 1.05 :  // Normal zoom for screen-3
                     currentIndex === 2 && index === 2 ? 1.18 : 1  // Increased zoom for screen-2b from 1.12 to 1.18
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
