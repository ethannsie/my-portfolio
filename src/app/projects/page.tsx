import ProjectCard from "../../components/ProjectCard";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Circuit Builder Simulation",
      description:
        "An interactive GlowScript/VPython simulation for building and testing circuits.",
      href: "/projects/circuitBuilder",
      iframe: "/circuitBuilder.html",
    },
    {
      title: "Markov Chain based Generative Music",
      description:
        "A PID-controlled robotic arm with real-time simulation and ROS interface.",
      href: "/projects/robotic-arm",
    },
    {
      title: "FEA Simulation Dashboard",
      description:
        "A React + Three.js dashboard visualizing FEA deformation modes and stresses.",
      href: "/projects/fea-dashboard",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <p className="text-gray-700 mb-8">
        A selection of engineering and software projects I’ve built.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <ProjectCard
            key={proj.href}
            title={proj.title}
            description={proj.description}
            href={proj.href}
            iframe={proj.iframe}
          />
        ))}
      </div>
    </div>
  );
}

