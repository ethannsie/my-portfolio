import TemplatePage from "../../../components/TemplatePage";

export default function MMC2025() {
  return (
    <TemplatePage
      title="Title"
      subtitle="Description"
      timeline="Start – End"
      contributors={["Ethan Sie"]}
      techStack={["skills"]}
      description={`
This blah blah blah

Features:
- blah
- blah
- blah

This was blah blah
      `}
      images={[
        ""
      ]}
      githubUrl=""
      demoUrl=""
      videoUrl=""
    />
  );
}
