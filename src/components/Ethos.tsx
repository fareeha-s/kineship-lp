'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import FocusTrap from 'focus-trap-react'

export default function Ethos({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Add a state for tracking which slide we're on (0, 1, or 2)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Reset slide when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0)
    }
  }, [isOpen])

  // Add this near the top of your component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide < 2) {
        setCurrentSlide(curr => curr + 1);
      }
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(curr => curr - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]); // Add currentSlide as dependency to check bounds correctly

  const getSlideEmoji = (slideIndex: number) => {
    switch(slideIndex) {
      case 0:
        return "➰";
      case 1:
        return "🫀🧬";
      case 2:
        return "🚀🌟";
      default:
        return "";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex lg:items-start lg:justify-start items-end justify-center z-[60] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70"
          />
          
          <FocusTrap focusTrapOptions={{ initialFocus: false }}>
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.98,
                y: window.innerWidth <= 1024 ? 100 : 0
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.98,
                y: window.innerWidth <= 1024 ? 100 : 0
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30 
              }}
              className="relative mx-auto lg:ml-[8%] lg:mt-48 mb-8 w-[90vw] lg:w-[45vw] max-w-2xl z-[70]
                       bg-black/10 backdrop-blur-[12px] rounded-3xl p-8 md:p-10
                       border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.3)]
                       font-inter"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
              
              <div className="relative text-white/90 lowercase font-inter">
                <motion.div
                  key={`slide-emoji-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[20px] mb-2"
                >
                  {getSlideEmoji(currentSlide)}
                </motion.div>

                <div className="space-y-0 lg:space-y-4">
                  <motion.p 
                    key={`slide-title-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`text-2xl md:text-3xl font-bold leading-relaxed ${
                      currentSlide === 1 ? '' : 'mb-4'
                    }`}
                  >
                    {currentSlide === 0 && "we believe simple, everyday rhythms can unite us."}
                    {currentSlide === 1 && "guided by longevity science,"}
                    {currentSlide === 2 && "we're creating a world where social connection brings you energy, not exhaustion."}
                  </motion.p>
                  
                  <motion.div 
                    key={`slide-content-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`${currentSlide === 1 ? '' : 'mt-4'}`}
                  >
                    {currentSlide === 0 && (
                      <>
                        <motion.p 
                          key={`slide-title-${currentSlide}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-2xl md:text-3xl font-bold leading-relaxed"
                        >
                        </motion.p>
                        <div className="space-y-1">
                          <p className="leading-relaxed text-white/80">
                            no need for grand plans or lengthy meetups.
                          </p>
                          <p className="leading-relaxed text-white/80">
                            just moving in parallel builds something special.
                          </p>
                        </div>
                      </>
                    )}
                    
                    {currentSlide === 1 && (
                      <>
                        <motion.p 
                          key={`slide-title-${currentSlide}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-2xl md:text-3xl font-bold leading-relaxed mb-0"
                        >
                        </motion.p>
                        <div className="space-y-4">
                          <div>
                            <p className="leading-relaxed text-white/70 ml-6">
                              our mission is to fundamentally shift how we grow our relationships: a key driver of lifespan.
                            </p>
                            <p className="leading-relaxed text-white/70 ml-12">
                              <span className="text-white">it's time for alternatives to our usual social defaults</span>.
                            </p>
                          </div>

                          <div className="mt-4">
                            <p className="text-white/70">
                              the data is clear -
                            </p>
                            <p className="leading-relaxed text-white/70 ml-6">
                              while our gatherings often revolve around abundant food, drinks, and late nights...
                            </p>
                            <p className="leading-relaxed text-white/70 ml-12">
                              <span className="text-white">we can choose to build a culture built on health</span>.
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {currentSlide === 2 && (
                      <motion.p 
                        className="text-base text-white/70"
                      >
                        if this vision moves you, <a 
                          href="mailto:hello@kineship.com"
                          className="text-white hover:text-white/70 transition-colors duration-200 border-b border-white/30 pb-1"
                        >
                          we'd love to hear from you.
                        </a>
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className={`h-1 w-8 rounded-full transition-colors duration-200 ${
                          currentSlide === dot ? 'bg-white' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {currentSlide > 0 && (
                      <motion.button
                        onClick={() => setCurrentSlide(curr => curr - 1)}
                        className="text-white/60 hover:text-white transition-colors duration-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <svg className="w-8 h-8 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    )}

                    {currentSlide < 2 && (
                      <motion.button
                        onClick={() => setCurrentSlide(curr => curr + 1)}
                        className="text-white/60 hover:text-white transition-colors duration-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <svg className="w-8 h-8 rotate-[-90deg]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center
                         rounded-full bg-white/10 hover:bg-white/20 
                         transition-all duration-200 ease-in-out"
                aria-label="close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>
          </FocusTrap>
        </div>
      )}
    </AnimatePresence>
  )
}
