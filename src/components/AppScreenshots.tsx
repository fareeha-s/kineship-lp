import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Desktop images
import screen1 from '../assets/appscreens/browser/screen-1.png';
import screen2a from '../assets/appscreens/browser/screen-2a.png';
import screen2b from '../assets/appscreens/browser/screen-2b.png';
import screen3 from '../assets/appscreens/browser/screen-3.png';
import screen4 from '../assets/appscreens/browser/screen-4.png';
// Mobile images (same names, different path)
import mobileScreen1 from '../assets/appscreens/mobile/test-1.svg';
import mobileScreen2 from '../assets/appscreens/mobile/test-2.svg';
import mobileScreen3 from '../assets/appscreens/mobile/test-3.svg';
import mobileScreen4 from '../assets/appscreens/mobile/test-4.svg';

const desktopScreenshots = [screen1, screen2a, screen2b, screen3, screen4];
const mobileScreenshots = [mobileScreen1, mobileScreen2, mobileScreen3, mobileScreen4];

import gracieLil from '../assets/appscreens/mobile/gracie-lil.png';

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
      setCurrentIndex((current) => (current + 1) % (isMobile ? 4 : desktopScreenshots.length));
    }, isMobile ? (
      currentIndex === 0 ? 2000 :  // Slide 1: 2s
      currentIndex === 1 ? 3000 :  // Slide 2: 3s
      currentIndex === 2 ? 3500 :  // Slide 3: 3.5s
      3500                         // Slide 4: 3.5s
    ) : 3000);

    return () => clearInterval(timer);
  }, [currentIndex, isMobile]);

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
              opacity: index === 0 ? 1 : 0,
              scale: 1
            }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              scale: 1
            }}
            transition={{ 
              duration: 2.0,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}