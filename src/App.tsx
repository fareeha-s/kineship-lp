import { useState, useEffect } from "react";
import "@fontsource/bricolage-grotesque";
import "@fontsource/inter";
import WaitlistForm from "./components/WaitlistForm";
import AppScreenshots from "./components/AppScreenshots";
import SocialLinks from "./components/SocialLinks";
import { AnimatedText } from "./components/AnimatedText";
import CustomCursor from "./components/CustomCursor";
import Ethos from "./components/Ethos";
import { motion } from "framer-motion";

function App() {
  const [isEthosOpen, setIsEthosOpen] = useState(false);
  const [secondImageLoaded, setSecondImageLoaded] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });

    const checkScreenSize = () => {
      const isSmall = window.matchMedia("(max-width: 1024px)").matches || 
                      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      setIsSmallScreen(isSmall);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const commonTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  };

  const mobileCommonTransition = {
    duration: 0.6,
    ease: "easeInOut",
  };

  return (
    <div className="relative min-h-screen min-h-[-webkit-fill-available] font-inter pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <CustomCursor />
      <div className="light-rays" />

      <main className="relative container mx-auto px-2 md:px-4 py-12 md:py-24 min-h-screen flex items-center">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <h1 className="hidden lg:block font-bricolage text-8xl font-bold mb-8 tracking-tight">
                <div
                  style={{
                    opacity: fontLoaded ? 1 : 0,
                    animation: fontLoaded
                      ? "slideInFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                      : "none",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span className="gradient-text relative inline-block">
                    kineship
                  </span>
                </div>
              </h1>

              <div
                className="lg:hidden mb-3"
                style={{
                  opacity: 0,
                  animation:
                    "fadeInSimple 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                  animationDelay: "0.1s",
                  marginTop: "-20px",
                }}
              >
                <AppScreenshots onSecondImageLoaded={() => setSecondImageLoaded(true)} />
              </div>

              <h1 className="block lg:hidden font-bricolage text-7xl md:text-7xl font-bold mb-3 tracking-tight text-center">
                <div
                  style={{
                    opacity: fontLoaded ? 1 : 0,
                    animation: fontLoaded 
                      ? "slideInFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                      : "none",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span className="gradient-text relative inline-block">
                    kineship
                  </span>
                </div>
              </h1>

              <p className="text-[5.5vw] md:text-4xl font-semibold text-white mb-8 leading-tight">
                <span className="hidden md:inline">
                  {fontLoaded && (
                    <AnimatedText
                      text="Make fitness the foundation of your social life."
                      delay={0.3}
                      type="simple"
                    />
                  )}
                </span>
                <span className="md:hidden">
                  <AnimatedText
                    text="from studio to squad"
                    delay={secondImageLoaded ? 0.2 : 9999}
                    type="fluid"
                  />
                </span>
              </p>

              <motion.div
                className="lg:hidden mb-8"
                initial={{ opacity: 0 }}
                animate={secondImageLoaded ? { opacity: 1 } : { opacity: 0 }}
                transition={{ ...mobileCommonTransition, delay: 0.8 }}
              >
                <WaitlistForm delay={0.1} />
              </motion.div>

              <div className="lg:hidden space-y-6 text-lg md:text-xl text-white/80 leading-relaxed lowercase text-center px-6 md:px-0">
                <p className="text-white/90">
                  <AnimatedText
                    text="the kineship app shares your workout calendar with your circles."
                    delay={secondImageLoaded ? 2.8 : 9999}
                    type="simple"
                  />
                </p>
                <p className="text-base md:text-lg text-white/80">
                  <AnimatedText
                    text="your runs. your reps. your reformer/boxing/spin/HIIT/yoga class—"
                    delay={secondImageLoaded ? 3.4 : 9999}
                    type="simple"
                  />
                  <AnimatedText
                    text="you're already going, turn your schedule into an invite"
                    delay={secondImageLoaded ? 4.0 : 9999}
                    type="simple"
                  />
                </p>
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={secondImageLoaded ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ ...mobileCommonTransition, delay: 4.8 }}
                >
                  <div className="flex justify-center">
                    <SocialLinks
                      onEthosClick={() => setIsEthosOpen(true)}
                      className="relative z-50"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="hidden lg:block space-y-6 text-lg md:text-xl text-white/80 leading-relaxed lowercase text-left">
                <p className="text-white/90">
                  {fontLoaded && (
                    <AnimatedText
                      text="the kineship app shares your workout calendar with your circles."
                      delay={2.0}
                      type="simple"
                    />
                  )}
                  <br />
                  <span className="font-bold">
                    {fontLoaded && (
                      <AnimatedText
                        text="from studio to squad"
                        delay={2.4}
                        type="fluid"
                      />
                    )}
                  </span>
                </p>
                <p className="text-base md:text-lg text-white/80">
                  {fontLoaded && (
                    <>
                      <AnimatedText
                        text="your runs. your reps. your reformer/boxing/spin/HIIT/yoga class—"
                        delay={2.8}
                        type="simple"
                      />
                      <AnimatedText
                        text="you're already going, turn your schedule into an invite"
                        delay={3.2}
                        type="simple"
                      />
                    </>
                  )}
                </p>
              </div>

              <div className="hidden lg:block mt-6 space-y-8">
                {fontLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...commonTransition, delay: 3.8 }}
                  >
                    <WaitlistForm delay={0.2} isSmallScreen={isSmallScreen} />
                  </motion.div>
                )}
                {fontLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...commonTransition, delay: 5.0 }}
                  >
                    <div className="flex flex-col items-center lg:items-start gap-4">
                      <SocialLinks
                        onEthosClick={() => setIsEthosOpen(true)}
                        className="relative z-50"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {fontLoaded && (
              <motion.div
                className="hidden lg:flex flex-1 justify-center items-center max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              >
                <AppScreenshots onSecondImageLoaded={() => setSecondImageLoaded(true)} />
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Ethos isOpen={isEthosOpen} onClose={() => setIsEthosOpen(false)} />
    </div>
  );
}

export default App;
