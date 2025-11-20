import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">Ethan Sie</Link>

        <div className="space-x-6 hidden md:block">
          <Link href="/projects" className="hover:text-sky-600">Projects</Link>
          <Link href="/competitions" className="hover:text-sky-600"> Competitions</Link>
          <Link href="/about" className="hover:text-sky-600">About</Link>
          <Link href="/resume" className="hover:text-sky-600"> Resume</Link>
          <a href="#contact" className="hover:text-sky-600">Contact</a> 
        </div>

        <div className="md:hidden">
          <button aria-label="open menu">☰</button>
        </div>
      </div>
    </nav>
  );
}

