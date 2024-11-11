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

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      // Only update if the coordinates are valid numbers
      if (!isNaN(e.clientX) && !isNaN(e.clientY)) {
        mouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    const updatePhysics = () => {
      const now = performance.now();
      const deltaTime = Math.min((now - lastTime.current) / 1000, 0.1);
      lastTime.current = now;

      // Calculate distance between shadow and target
      const dx = mouse.current.x - position.current.x;
      const dy = mouse.current.y - position.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Increased distance threshold with smoother reset
      if (distance > 200) { // Increased from 100 to 200
        position.current = {
          x: mouse.current.x - (dx * 0.3), // More gradual catch-up
          y: mouse.current.y - (dy * 0.3)
        };
        velocity.current = { x: 0, y: 0 };
        requestAnimationFrame(updatePhysics);
        return;
      }

      // Spring physics with progressive stiffness
      const baseStiffness = 80; // Reduced from 120 to allow more "loose" feel
      const stiffness = baseStiffness * (1 + Math.pow(distance / 150, 1.5)); // More dramatic curve
      const damping = 6; // Reduced damping to allow more movement
      const mass = 1;

      // Calculate spring force
      const springX = dx * stiffness;
      const springY = dy * stiffness;

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
    const animationFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
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
