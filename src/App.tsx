import React, { useState } from 'react';
import '@fontsource/bricolage-grotesque';
import '@fontsource/inter';
import { gsap } from 'gsap'; // Keep the GSAP import for later use
import WaitlistForm from './components/WaitlistForm';
import AppScreenshots from './components/AppScreenshots';
import SocialLinks from './components/SocialLinks';
import ParticleEffect from './components/ParticleEffect';
import { AnimatedText } from './components/AnimatedText';
import { FastAnimatedText } from './components/FastAnimatedText';
import CustomCursor from './components/CustomCursor';
import Ethos from './components/Ethos';

function App() {
  const [isEthosOpen, setIsEthosOpen] = useState(false);

  return (
    <div className="relative min-h-screen font-inter overflow-hidden">
      <CustomCursor />
      <div className="light-rays" />
      
      <main className="relative container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-24">
          <div className="flex-1 flex justify-center items-center max-w-lg">
            <AppScreenshots />
          </div>
          
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 className="font-bricolage text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              <div style={{ 
                opacity: 0, 
                animation: 'slideInFade 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}>
                <span className="gradient-text relative inline-block">
                  kineship
                </span>
              </div>
            </h1>

            <p className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
              <AnimatedText 
                text="What if fitness was the foundation of your social life?" 
                delay={1.2}
                type="simple"
              />
            </p>

            <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed lowercase text-center lg:text-left">
              <p className="text-white/90">
                <AnimatedText 
                  text="the kineship app shares your workout calendar with your circles." 
                  delay={3.4}
                  type="simple"
                />
                &nbsp;
                <span className="font-bold">
                  <AnimatedText 
                    text="build muscle while building bonds 💪✨"
                    delay={4.2}
                    type="fluid"
                  />
                </span>
              </p>
              <p className="text-base md:text-lg text-white/80">
                <AnimatedText 
                  text="from your runs to your reps to your spin/pilates/kickboxing class—" 
                  delay={4.5}
                  type="simple"
                  highlightWords={['runs', 'reps', 'spin/pilates/kickboxing', 'class']}
                />
                <AnimatedText 
                  text="you're already going, " 
                  delay={4.7}
                  type="simple"
                />
                <span className="shine-once">
                  <AnimatedText 
                    text="turn your schedule into an invite" 
                    delay={4.7}
                    type="simple"
                  />
                </span>
              </p>
            </div>
            
            <div className="mt-6 space-y-8 text-center">
              <div style={{ 
                opacity: 0, 
                animation: 'fadeInSimple 2.5s ease forwards',
                animationDelay: '6.5s'
              }}>
                <WaitlistForm />
              </div>
              
              <div style={{ 
                opacity: 0, 
                animation: 'fadeInSimple 2.5s ease forwards',
                animationDelay: '6.7s'
              }}>
                <div className="flex flex-col items-center lg:items-start gap-4">
                  <SocialLinks onEthosClick={() => setIsEthosOpen(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Ethos 
        isOpen={isEthosOpen}
        onClose={() => setIsEthosOpen(false)}
      />
    </div>
  );
}

export default App;
