"use client";

import { useEffect, useRef } from "react";
import { createPhysicsSketch } from "../app/projects/physics/demo/physicsSketch";

export default function PhysicsDemo() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const p5InstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      if (canvasRef.current && isMounted) {
        p5InstanceRef.current = new p5(
          (p: any) => {
            createPhysicsSketch(p);

            // Auto-resize canvas on window resize
            p.windowResized = () => {
              const parentWidth = canvasRef.current?.clientWidth || 800;
              p.resizeCanvas(parentWidth, parentWidth * 0.6);
            };
          },
          canvasRef.current
        );
      }
    })();

    return () => {
      isMounted = false;
      if (p5InstanceRef.current) p5InstanceRef.current.remove();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "2rem auto",
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
}
