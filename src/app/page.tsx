import Link from "next/link";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const projects = [
    { id: 1, title: "Robotics Arm", description: "PID-controlled robotic arm with ROS.", href: "/projects/robotic-arm" },
    { id: 2, title: "Simulation Dashboard", description: "React dashboard for FEA visualization.", href: "/projects/sim-dashboard" }
  ];

  return (
    <section>
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold">Hi, I’m <span className="text-sky-600">Your Name</span>.</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          I design and build mechanical systems and web tools. I’m currently studying Mechanical Engineering.
        </p>
        <div className="mt-6">
          <Link href="/projects" className="inline-block px-4 py-2 bg-sky-600 text-white rounded-md">View projects</Link>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(p => <ProjectCard key={p.id} title={p.title} description={p.description} href={p.href} />)}
        </div>
      </section>
    </section>
  );
}
