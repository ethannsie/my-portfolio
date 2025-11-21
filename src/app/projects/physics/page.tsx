import TemplatePage from "../../../components/TemplatePage";

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

      description={`
This project is an interactive physics sandbox built from scratch in Processing (Java mode). 
The original version implemented a custom physics engine, object structures, collision logic, 
and rendering pipeline. To make the experience browser-accessible, I later ported the system 
to JavaScript using p5.js so it can run live on the web.

### 🔧 What It Does
Users can:
- spawn, drag, and interact with simulated objects
- visualize forces, velocities, and physical responses
- explore rigid-body dynamics inside an open, interactive sandbox

### 🛠 My Role
- **Created the entire physics engine in Processing (Java)**, including:
  - body structures (position, velocity, acceleration, mass)
  - force application and integration logic
  - motion updates using numerical methods
  - collision behavior and state management
  - rendering pipeline and user interaction system
- **Ported the full system to JavaScript (p5.js)** for browser-based execution
- Reworked Processing-specific features into JS equivalents (vectors, loops, input events)
- Optimized the draw loop and physics timestep for web performance
- Designed this project page to host, document, and showcase the live simulation

### 📐 Technical Details
- **Rendering:** p5.js draw loop (60fps target)
- **Integration Method:** Euler method with adjustable delta-t
- **Simulation Features:** forces, drag interactions, body updates, boundary handling
- **Developer Tools:** Chrome DevTools, VS Code, GitHub

### 🧪 Result
The simulation now runs natively in the browser.  
Below is a live demo powered entirely by the JavaScript port of the original Processing program.

Scroll to interact with the simulation.
      `}

      images={[
        "/images/projects/physics/physics1.png",
        "/images/projects/physics/physics2.png",
        "/images/projects/physics/physics3.png",
      ]}

      githubUrl="https://github.com/ethannsie/p00-physics-ethan_richie"

      demoUrl="/projects/physics-sandbox/demo/index.html"

      videoUrl=""
    />
  );
}
