import React from 'react';
import '@fontsource/bricolage-grotesque';
import '@fontsource/inter';
import { motion } from 'framer-motion';
import WaitlistForm from './components/WaitlistForm';
import AppScreenshots from './components/AppScreenshots';
import SocialLinks from './components/SocialLinks';
import ParticleEffect from './components/ParticleEffect';

function App() {
  return (
    <div className="relative min-h-screen bg-black font-inter overflow-hidden">
      <ParticleEffect />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/80 to-black pointer-events-none" />
      
      <main className="relative container mx-auto px-4 py-12 md:py-24">
        <motion.div 
          className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex-1 flex justify-center items-center max-w-lg">
            <AppScreenshots />
          </div>
          
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="font-bricolage text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
                <span className="gradient-text">Kineship</span>
              </h1>
              <p className="text-2xl md:text-3xl italic text-white/90 mb-8 leading-relaxed">
                What if fitness was the foundation of your social life?
              </p>
              <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  The Kineship app invites your social circles to join in on the workouts already in your calendar.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Your run/strength/pilates/kickboxing/spin sets: now moments to build bonds as strong as your core.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <WaitlistForm />
              <div className="flex flex-col items-center lg:items-start gap-4">
                <p className="text-white/60">Join our community</p>
                <SocialLinks />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;