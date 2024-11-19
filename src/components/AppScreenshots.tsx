import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Desktop images
import screen1 from '../assets/appscreens/browser/screen-1.png';
import screen2a from '../assets/appscreens/browser/screen-2a.png';
import screen2b from '../assets/appscreens/browser/screen-2b.png';
import screen2c from '../assets/appscreens/browser/screen-2c.png';
import screen3 from '../assets/appscreens/browser/screen-3.png';
import screen4 from '../assets/appscreens/browser/screen-4.png';
// Mobile images (same names, different path)
import mobileScreen1 from '../assets/appscreens/mobile/screen-1.png';
import mobileScreen2 from '../assets/appscreens/mobile/screen-2a.png';
import mobileScreen3 from '../assets/appscreens/mobile/screen-3.png';
import mobileScreen4 from '../assets/appscreens/mobile/screen-4.png';

const desktopScreenshots = [screen1, screen2a, screen2b, screen2c, screen3, screen4];
const mobileScreenshots = [mobileScreen1, mobileScreen2, mobileScreen3, mobileScreen4];


export default function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(-1);  // Start with nothing showing
  const [hasStarted, setHasStarted] = useState(false);  // Track if we've started the sequence
  const [isMobile, setIsMobile] = useState(false);

  // Initial delay to sync with main question
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setCurrentIndex(0);  // Show first slide
      setHasStarted(true); // Mark that we've started
    }, 800);  // Appears right after main question (which shows at 0.6s)

    return () => clearTimeout(initialDelay);
  }, []);

  // Main interval for transitions
  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setCurrentIndex((current) => (current + 1) % (isMobile ? mobileScreenshots.length : desktopScreenshots.length));
      }, 
        isMobile ? (
          currentIndex === 0 ? 1200 :  // First transition
          currentIndex === 1 ? 1500 :  // Second transition
          currentIndex === 2 ? 1500 :  // Third transition
          1500                         // Rest
        ) : (
          currentIndex === 0 ? 1200 :  // First transition
          currentIndex === 1 ? 800 :   // Second transition
          currentIndex === 2 ? 800 :   // Third transition
          currentIndex === 3 ? 800 :   // Fourth transition
          2000                         // Rest
        )
      );
      
      return () => clearInterval(timer);
    }
  }, [isMobile, currentIndex, hasStarted]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = 
        window.matchMedia('(max-width: 1024px)').matches ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`relative [transform:translateZ(0)] ${isMobile ? 'h-[430px]' : 'h-[510px]'} overflow-hidden`}>
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
              isMobile ? 'h-[430px]' : 'h-[510px]'
            } object-contain mix-blend-normal`}
            style={{ imageRendering: 'crisp-edges' }}
            initial={{
              opacity: 0
            }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0
            }}
            transition={{ 
              duration: 0.8, // Reduced from 1.5
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}