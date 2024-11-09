import React from 'react';
import '@fontsource/bricolage-grotesque';
import '@fontsource/inter';
import { gsap } from 'gsap'; // Keep the GSAP import for later use
import WaitlistForm from './components/WaitlistForm';
import AppScreenshots from './components/AppScreenshots';
import SocialLinks from './components/SocialLinks';
import ParticleEffect from './components/ParticleEffect';
import { AnimatedText } from './components/AnimatedText';

function App() {
  return (
    <div className="relative min-h-screen bg-black font-inter overflow-hidden">
      <ParticleEffect />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/80 to-black pointer-events-none" />
      
      <main className="relative container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-24">
          <div className="flex-1 flex justify-center items-center max-w-lg">
            <AppScreenshots />
          </div>
          
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 className="font-bricolage text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              <span className="gradient-text">
                kineship
              </span>
            </h1>

            <p className="text-3xl md:text-4xl font-bold text-white/90 mb-8 leading-tight">
              <AnimatedText 
                text="What if fitness was the foundation of your social life?" 
                delay={0}
                type="simple"
              />
            </p>

            <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed lowercase text-center lg:text-left rounded-3xl backdrop-blur-xl bg-white/5">
              <p className="text-white/90">
                <AnimatedText 
                  text="the kineship app shares your fitness calendar with your circles." 
                  delay={2}
                  type="simple"
                />
                &nbsp;
                <span className="font-bold">
                  <AnimatedText 
                    text="build muscle while building bonds 💪✨" 
                    delay={4}
                    type="fluid"
                  />
                </span>
              </p>
              <p className="text-base md:text-lg text-white/80">
                <AnimatedText 
                  text="from your runs to your reps to your spin/pilates/kickboxing class—you're already going, turn your schedule into an invite" 
                  delay={6}
                  type="simple"
                />
              </p>
            </div>
            
            <div className="mt-12 space-y-8">
              <WaitlistForm />
              <div className="flex flex-col items-center lg:items-start gap-4">
                <p className="text-white/60 lowercase">join our community</p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
