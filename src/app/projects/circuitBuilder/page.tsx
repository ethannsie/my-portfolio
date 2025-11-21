import TemplatePage from "../../../components/TemplatePage";
import Link from "next/link";

export default function circuitBuilder() {
  return (
    <TemplatePage
      title="Physics Circuit Builder Simulation"
      subtitle="Interactive GlowScript/VPython environment for resistor/emf circuit logic"
      timeline="May 2025 – Jun 2025"
      contributors={["Ethan Sie", "Judy Namkoong"]}
      techStack={[
        "GlowScript",
        "VPython",
        "Javascript",
        "Physics Simulation",
      ]}
      description={`Physics Circuit Builder is an interactive tool built with GlowScript / Web VPython that lets users visually build, connect, and simulate electrical circuits directly in the browser. Designed as both a learning tool and a lightweight engineering sandbox, it allows you to drag components onto a canvas, wire them together, and instantly see how the circuit behaves.

The system supports key circuit elements—such as resistors, voltage sources, wires, and nodes—each rendered as dynamic 3D objects. Users can connect terminals, adjust component values, and run a real-time simulation that solves the underlying circuit using simplified Kirchhoff-based calculations. The workspace updates live, showing current flow and voltage distributions in an intuitive and visually engaging way.`}
      images={[
        "/images/projects/circuit/circuit.png",
      ]}
      githubUrl="https://github.com/ethannsie/physics-circuit-builder"
      demoUrl=""
      videoUrl=""
    >
      {/* Add a button linking to the live demo page */}
<div className="flex gap-6 mt-8 mb-8">
  <Link href="/projects/circuitBuilder/demo">
    <button
      className="px-6 py-3 border border-brand-orange text-brand-orange rounded-lg text-lg font-semibold 
                 hover:bg-brand-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      View Live Demo
    </button>
  </Link>

  <Link href="https://www.glowscript.org/#/user/sie.ethan/folder/MyPrograms/program/circuitBuilder">
    <button
      className="px-6 py-3 border border-brand-orange text-brand-orange rounded-lg text-lg font-semibold 
                 hover:bg-brand-white hover:text-black transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      View Web Demo
    </button>
  </Link>
</div>

    </TemplatePage>
  );
}
