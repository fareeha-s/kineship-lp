import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// Desktop images
import screen1 from "../assets/appscreens/browser/screen-1.png";
import screen2c from "../assets/appscreens/browser/screen-2c.png";
import screen3Browser from "../assets/appscreens/browser/screen-3.png"; // Renamed to avoid conflict if you name mobile screen-3.png
import screen4Browser from "../assets/appscreens/browser/screen-4.png"; // Renamed to avoid conflict
// Mobile images - new 3-image sequence
import mobileScreen1 from "../assets/appscreens/mobile/screen-1.png"; 
import mobileScreen2 from "../assets/appscreens/mobile/screen-2.png"; 
import mobileScreen3 from "../assets/appscreens/mobile/screen-3.png";
// Comment out or remove experimental image imports
// import newMobileScreen1_v2 from "../assets/appscreens/mobile/Group 108.png";
// import newMobileScreen2_v2 from "../assets/appscreens/mobile/Group 109.png";

const desktopScreenshots = [screen1, screen2c, screen3Browser, screen4Browser];
// Use new 3-image sequence for mobile
const mobileScreenshots = [
  mobileScreen1, 
  mobileScreen2, 
  mobileScreen3,
];

interface AppScreenshotsProps {
  onSecondImageLoaded: () => void;
}

// Helper function to check mobile status, can be outside component if it doesn't rely on component props/state
const getIsMobile = () => {
  if (typeof window === "undefined") return false; // For SSR or non-browser environments
  return (
    window.matchMedia("(max-width: 1024px)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
};

export default function AppScreenshots({ onSecondImageLoaded }: AppScreenshotsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(true);
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(
        () => {
          setCurrentIndex(
            (current) => {
              const nextIndex = (current + 1) % (isMobile ? mobileScreenshots.length : desktopScreenshots.length);
              if (isMobile && nextIndex === 1) {
                onSecondImageLoaded();
              }
              if (!isMobile && nextIndex === 1) {
                // onSecondImageLoaded(); // Desktop logic if needed, currently App.tsx handles desktop AppScreenshot container timing
              }
              return nextIndex;
            }
          );
        },
        isMobile
          ? currentIndex === 0
            ? 1000 // Mobile Image 1 (index 0) duration
            : currentIndex === 1 
              ? 2800 // Mobile Image 2 (index 1) duration - Synced with "the kineship app shares..." text
              : 3000 // Mobile Image 3 (index 2) duration (and any subsequent if array grows)
          : currentIndex === 0
            ? 2000 // Desktop Image 1 duration
            : currentIndex === 1
              ? 2500 // Desktop Image 2 duration
              : 4500, // Desktop subsequent images duration
      );
      return () => clearInterval(timer);
    }
  }, [isMobile, currentIndex, hasStarted, onSecondImageLoaded]);

  // Effect to update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array, runs once on mount and cleans up on unmount

  // Determine current screenshots array based on isMobile state
  const currentScreenshots = isMobile ? mobileScreenshots : desktopScreenshots;

  return (
    <div
      className={`relative [transform:translateZ(0)] ${isMobile ? "h-[350px]" : "h-[510px]"} overflow-hidden`}
    >
      {/* Placeholder image for layout, using the determined currentScreenshots array */}
      {currentScreenshots.length > 0 && (
        <img
          src={currentScreenshots[0]}
          alt=""
          className="invisible"
          aria-hidden="true"
          // style={{ imageRendering: "crisp-edges" }} // Removed for testing
        />
      )}

      <div className="absolute top-0 left-0 right-0">
        {currentScreenshots.map((screenshot, index) => (
          <motion.img
            key={`${isMobile}-${index}`} // Key change to force re-render if isMobile changes
            src={screenshot}
            alt={`App Screenshot ${index + 1}`}
            className={`rounded-[20px] shadow-2xl absolute top-0 left-0 origin-center w-full ${
              isMobile ? "h-[350px]" : "h-[510px]"
            } object-contain mix-blend-normal`}
            // style={{ imageRendering: "crisp-edges" }} // Removed for testing
            initial={{ opacity: index === 0 ? 1 : 0 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
            }}
            transition={isMobile ? { duration: 0.6, ease: "easeInOut" } : { duration: 0.8, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
