// PhysicsDemoClient.tsx
"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { createPhysicsSketch } from "./physicsSketch";

const PhysicsDemoClient: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      p5InstanceRef.current = new p5((p) => createPhysicsSketch(p), containerRef.current);
    }

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
      <h2 style={{
        fontSize: "2rem",
        fontWeight: 600,
        marginBottom: "1rem",
        marginTop: "3rem",
        color: "#333",
        textAlign: "center",
        textShadow: "1px 1px 3px rgba(0,0,0,0.1)"
      }}>
        Physics Sandbox Demo
      </h2>
      <div
        id="physics-canvas"
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "70vh",
          minHeight: "500px",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
          overflow: "hidden",
          background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
        }}
      />
    </div>
  );
};

export default PhysicsDemoClient;
