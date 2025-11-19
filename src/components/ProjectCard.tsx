import Link from "next/link";

export default function ProjectCard({ title, description, href }: { title: string; description: string; href: string; }) {
  return (
    <article className="p-6 border rounded-lg hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={href} className="text-sm font-medium text-sky-600">Read more →</Link>
    </article>
  );
}

