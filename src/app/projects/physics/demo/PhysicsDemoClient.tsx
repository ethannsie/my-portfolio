// PhysicsDemoClient.tsx
"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { createPhysicsSketch } from "./physicsSketch"; // your physicsSketch.js

const PhysicsDemoClient: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize p5
      p5InstanceRef.current = new p5((p) => createPhysicsSketch(p), containerRef.current);
    }

    return () => {
      // Clean up p5 on unmount
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="physics-canvas"
      ref={containerRef}
      style={{ width: "100%", height: "800px", border: "1px solid #ccc" }}
    />
  );
};

export default PhysicsDemoClient;
