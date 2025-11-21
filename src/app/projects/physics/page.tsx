import TemplatePage from "../../../components/TemplatePage";
import Link from "next/link";

export default function PhysicsSandbox() {
  return (
    <TemplatePage
      title="Interactive Physics Sandbox Simulation"
      subtitle="A custom-built physics engine created in Processing and ported to JavaScript"
      timeline="September 2024 – October 2024"
      contributors={["Ethan Sie", "Richard Delgado"]}
      techStack={[
        "Processing (Java)",
        "JavaScript",
        "p5.js",
        "HTML/CSS",
        "Physics Simulation",
      ]}
      description={`This is an interactive p5.js–based physics sandbox that lets users experiment with gravitational systems, collisions, and orbital mechanics in real time. Objects like planets and particles have mass, velocity, and forces applied to them, allowing for realistic motion and dynamic interactions.

Users can create, move, or delete objects, adjust orbits, and observe real-time metrics such as velocities, distances, and gravitational forces. The simulation features modular classes for bodies, collision detection, and force calculations, ensuring accurate physics while maintaining performance.`}
      images={[
        "/images/projects/physics/physics1.png",
        "/images/projects/physics/physics2.png",
        "/images/projects/physics/physics3.png",
      ]}
      githubUrl="https://github.com/ethannsie/physics-sandbox-simulation"
      demoUrl=""
      videoUrl=""
    >
      {/* Add a button linking to the live demo page */}
      <div style={{ textAlign: "left", marginTop: "2rem", marginBottom: "2rem"}}>
        <Link href="/projects/physics/demo">
          <button className="px-6 py-3 border border-brand-orange text-brand-orange rounded-lg text-lg font-semibold 
                       hover:bg-brand-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Live Demo
          </button>
        </Link>
      </div>
    </TemplatePage>
  );
}
