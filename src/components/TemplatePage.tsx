import Image from "next/image";

interface ProjectPageProps {
  title: string;
  subtitle?: string;
  timeline?: string;
  contributors?: string[];
  techStack?: string[];
  description?: string;
  images?: string[];
  videoUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  extraButton?: { label: string; url: string };
}

export default function TemplatePage({
  title,
  subtitle,
  timeline,
  contributors,
  techStack,
  description,
  images,
  videoUrl,
  githubUrl,
  demoUrl,
  extraButton,
}: ProjectPageProps) {
  return (
    <div className="w-full min-h-screen py-20 px-6 md:px-16 bg-brand-navy_blue text-brand-white">
      <div className="max-w-5xl mx-auto">

        {/* TITLE + GITHUB ICON */}
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>

          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/logos/github_white.png" // place your GitHub logo in /public
                alt="GitHub Repository"
                width={60}
                height={60}
                className="opacity-80 hover:opacity-100 transition cursor-pointer"
              />
            </a>
          )}
        </div>

        {/* SUBTITLE */}
        {subtitle && (
          <p className="text-xl md:text-2xl font-light mb-8 text-brand-pink">
            {subtitle}
          </p>
        )}

        {/* META */}
        <div className="flex flex-col gap-2 mb-10 text-brand-pink">
          {timeline && (
            <p>
              <span className="font-semibold">Timeline:</span> {timeline}
            </p>
          )}
          {contributors && contributors.length > 0 && (
            <p>
              <span className="font-semibold">Contributors:</span>{" "}
              {contributors.join(", ")}
            </p>
          )}
          {techStack && techStack.length > 0 && (
            <p>
              <span className="font-semibold">Tech Stack:</span>{" "}
              {techStack.join(", ")}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        {description && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Overview</h2>
            <p className="text-lg leading-8 font-light text-brand-pink whitespace-pre-line">
              {description}
            </p>
          </section>
        )}

        {/* GALLERY */}
        {images && images.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt={`Project image ${idx + 1}`}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              ))}
            </div>
          </section>
        )}

        {/* BUTTONS (GitHub removed because icon is now in header) */}
        <section className="mb-16 flex flex-wrap gap-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              className="px-6 py-3 bg-brand-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Live Demo
            </a>
          )}

          {extraButton && (
            <a
              href={extraButton.url}
              target="_blank"
              className="px-6 py-3 border border-brand-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              {extraButton.label}
            </a>
          )}
        </section>

        {/* VIDEO */}
        {videoUrl && (
          <section className="mb-24">
            <h2 className="text-3xl font-semibold mb-4">Demo Video</h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}