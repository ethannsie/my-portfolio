"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";

// Import the sketch function we created earlier
// Assuming it is saved in a utility folder or similar
import { createPhysicsSketch } from "./physicsSketch"; 

export default function PhysicsDemo() {
  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    // Ensure we are in the browser and the container exists
    if (typeof window !== "undefined" && p5ContainerRef.current) {
      
      // Destroy previous instance if it exists (prevents duplicates during HMR/React Strict Mode)
      if (p5Instance.current) {
        p5Instance.current.remove();
      }

      // Initialize p5 with the container reference
      // We pass the actual DOM node via the sketch closure if needed, 
      // or rely on the ID inside the sketch.
      const sketch = (p: p5) => {
        createPhysicsSketch(p);
        
        // OVERRIDE setup to ensure it attaches to THIS specific ref
        // This is safer than relying on document.getElementById inside the sketch file
        const originalSetup = p.setup;
        p.setup = () => {
            // Run the original setup logic to init variables
            if(originalSetup) originalSetup();
            
            // FORCE the canvas parent to be our React Ref
            // Note: We have to resize strictly here to match the container
            const w = p5ContainerRef.current?.clientWidth || 800;
            const h = p5ContainerRef.current?.clientHeight || 600;
            p.resizeCanvas(w, h);
        };
      };

      // Create the p5 instance attached to the ref
      p5Instance.current = new p5(sketch, p5ContainerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return (
    <div className="mt-20 flex flex-col items-center justify-center w-full bg-brand-navy_blue">
      {/* 1. We give this div the ID 'physics-canvas' so the sketch code finds it.
         2. We use a ref to ensure React knows when it's mounted.
         3. We give it a specific height so the canvas doesn't collapse.
      */}
      <p className="mt-4 text-sm text-brand-white bg-brand-navy_blue">
        Click inside the simulation to interact. Press [i] for instructions.
      </p>
      <div 
        id="physics-canvas" 
        ref={p5ContainerRef} 
        className="w-[83%] h-[600px] border border-gray-200 rounded-lg shadow-sm bg-brand-navy_blue overflow-hidden relative"
      >
      </div>
      
      
    </div>
  );
}