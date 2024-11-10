import React, { useEffect, useRef } from 'react';

declare const gsap: any;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    const moveCircle = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        ease: "none"
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,  // Slightly longer follow
        ease: "expo.out"  // More pronounced easing
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    document.addEventListener('mousemove', moveCircle);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCircle);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        {/* White background star */}
        <div className="absolute text-white text-[32px] italic opacity-90 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          ✦
        </div>
        {/* Coral foreground star */}
        <div className="relative text-[#FF6B7A] text-[24px] italic opacity-90">
          ✦
        </div>
      </div>

      {/* Follower */}
      <div 
        ref={followerRef}
        className="fixed pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="text-white text-[32px] italic opacity-50">
          ✦
        </div>
      </div>
    </>
  );
}
