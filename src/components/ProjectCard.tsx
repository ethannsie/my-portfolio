import Link from "next/link";

export default function ProjectCard({
  title,
  description,
  href,
  iframe
}: {
  title: string;
  description: string;
  href: string;
  iframe?: string;
}) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-gray-600 mb-4">{description}</p>

      {iframe && (
        <div className="mb-4 w-full h-48 overflow-hidden rounded-lg border">
          <iframe
            src={iframe}
            className="w-full h-full border-0"
            title={title}
          />
        </div>
      )}

      <Link
        href={href}
        className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        View Project →
      </Link>
    </div>
  );
}
