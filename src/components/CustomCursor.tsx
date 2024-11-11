import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  
  // Physics state refs (using refs to avoid re-renders)
  const mouse = useRef<Point>({ x: 0, y: 0 });
  const position = useRef<Point>({ x: 0, y: 0 });
  const velocity = useRef<Point>({ x: 0, y: 0 });
  const lastTime = useRef<number>(performance.now());
  const isWindowFocused = useRef<boolean>(true);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      // Only update if the coordinates are valid numbers
      if (!isNaN(e.clientX) && !isNaN(e.clientY)) {
        mouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Add focus/blur handlers
    const handleFocus = () => {
      isWindowFocused.current = true;
    };

    const handleBlur = () => {
      isWindowFocused.current = false;
    };

    const updatePhysics = () => {
      // Skip physics update if window is not focused
      if (!isWindowFocused.current) {
        lastTime.current = performance.now();
        requestAnimationFrame(updatePhysics);
        return;
      }

      const now = performance.now();
      const deltaTime = Math.min((now - lastTime.current) / 1000, 0.1);
      lastTime.current = now;

      // Calculate distance between shadow and target
      const dx = mouse.current.x - position.current.x;
      const dy = mouse.current.y - position.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If shadow is too far from mouse, reset it to mouse position
      if (distance > 100) { // Reduced from 200 to 100
        // Smoothly reset position
        position.current = {
          x: mouse.current.x - (dx * 0.1), // Move 90% of the way there
          y: mouse.current.y - (dy * 0.1)
        };
        velocity.current = { x: 0, y: 0 };
        requestAnimationFrame(updatePhysics);
        return;
      }

      // Slightly increased but maintains relationship
      const proximityMultiplier = Math.max(1, 60 / (distance + 1));

      // Maintain the original proportions but increase overall responsiveness
      const baseStiffness = 150; // Careful increase from 120
      const stiffness = baseStiffness * proximityMultiplier;
      const damping = 8 + (proximityMultiplier * 2); // Keeping original relationship
      const mass = 1; // Keeping original mass for stability

      // Calculate spring force with proximity effect
      const springX = (dx * stiffness);
      const springY = (dy * stiffness);

      // Apply forces
      const ax = springX / mass;
      const ay = springY / mass;

      // Update velocity with damping
      velocity.current.x += ax * deltaTime;
      velocity.current.y += ay * deltaTime;
      velocity.current.x *= Math.pow(1 - damping * deltaTime, 2);
      velocity.current.y *= Math.pow(1 - damping * deltaTime, 2);

      // Update position
      position.current.x += velocity.current.x * deltaTime;
      position.current.y += velocity.current.y * deltaTime;

      // Apply positions to DOM
      if (cursorRef.current && shadowRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
        shadowRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }

      requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    const animationFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none z-[100] top-0 left-0 -ml-[12px] -mt-[12px]"
      >
        <div className="relative text-[#FF6B7A] text-[24px] italic opacity-90">
          ✦
        </div>
      </div>

      {/* Shadow cursor */}
      <div 
        ref={shadowRef}
        className="fixed pointer-events-none z-[99] top-0 left-0 -ml-[16px] -mt-[16px]"
      >
        <div className="text-white text-[32px] italic opacity-70">
          ✦
        </div>
      </div>
    </>
  );
}
