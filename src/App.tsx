import { useState } from 'react';
import '@fontsource/bricolage-grotesque';
import '@fontsource/inter';
import WaitlistForm from './components/WaitlistForm';
import AppScreenshots from './components/AppScreenshots';
import SocialLinks from './components/SocialLinks';
import { AnimatedText } from './components/AnimatedText';
import CustomCursor from './components/CustomCursor';
import Ethos from './components/Ethos';

function App() {
  const [isEthosOpen, setIsEthosOpen] = useState(false);

  return (
    <div className="relative min-h-screen min-h-[-webkit-fill-available] font-inter pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <CustomCursor />
      <div className="light-rays" />
      
      <main className="relative container mx-auto px-2 md:px-4 py-12 md:py-24 min-h-screen flex items-center">
        <div className="w-full">
          <h1 className="block lg:hidden font-bricolage text-7xl md:text-7xl font-bold mb-3 tracking-tight text-center">
            <div style={{ 
              opacity: 0, 
              animation: 'slideInFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '0.1s',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}>
              <span className="gradient-text relative inline-block">
                kineship
              </span>
            </div>
          </h1>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <h1 className="hidden lg:block font-bricolage text-8xl font-bold mb-8 tracking-tight">
                <div style={{ 
                  opacity: 0, 
                  animation: 'slideInFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  animationDelay: '0.1s',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}>
                  <span className="gradient-text relative inline-block">
                    kineship
                  </span>
                </div>
              </h1>

              <p className="text-[5.5vw] md:text-4xl font-semibold text-white mb-8 leading-tight">
                <AnimatedText 
                  text="What if fitness was the foundation of your social life?" 
                  delay={0.6}
                  type="simple"
                />
              </p>

              <div className="lg:hidden mb-8" style={{ 
                opacity: 0, 
                animation: 'fadeInSimple 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '2.0s'
              }}>
                <AppScreenshots />
              </div>

              <div className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed lowercase text-center lg:text-left px-6 md:px-0">
                <p className="text-white/90">
                  <AnimatedText 
                    text="the kineship app shares your workout calendar with your circles." 
                    delay={2.4}
                    type="simple"
                  />
                  <br />
                  <span className="font-bold">
                    <AnimatedText 
                      text="build muscle, build bonds 💪✨"
                      delay={2.8}
                      type="fluid"
                    />
                  </span>
                </p>
                <p className="text-base md:text-lg text-white/80">
                  <AnimatedText 
                    text="from your runs to your reps to your spin/pilates/kickboxing class—" 
                    delay={3.6}
                    type="simple"
                  />
                  <AnimatedText 
                    text="you're already going, " 
                    delay={3.8}
                    type="simple"
                  />
                  <AnimatedText 
                    text="turn your schedule into an invite" 
                    delay={4.0}
                    type="simple"
                  />
                </p>
              </div>

              <div className="mt-6 space-y-8">
                <div style={{ 
                  opacity: 0, 
                  animation: 'fadeInSimple 0.8s ease forwards',
                  animationDelay: '4.2s'
                }}>
                  <WaitlistForm />
                </div>
                
                <div style={{ 
                  opacity: 0, 
                  animation: 'fadeInSimple 0.8s ease forwards',
                  animationDelay: '4.4s'
                }}>
                  <div className="flex flex-col items-center lg:items-start gap-4">
                    <SocialLinks 
                      onEthosClick={() => setIsEthosOpen(true)} 
                      className="relative z-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex flex-1 justify-center items-center max-w-lg" style={{ 
              opacity: 0, 
              animation: 'fadeInSimple 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '1.4s'
            }}>
              <AppScreenshots />
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