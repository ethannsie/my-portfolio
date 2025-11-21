import TemplatePage from "../../../components/TemplatePage";

export default function Martian() {
  return (
    <TemplatePage
      title="Title"
      subtitle="Description"
      timeline="Start – End"
      contributors={["Ethan Sie"]}
      techStack={[]}
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
      pdfView="https://vgatltf8hagpubgw.public.blob.vercel-storage.com/Exploring%20Blended%20Wing%20Body%20Aircraft%20for%20Mars%20Exploration_%20A%20Multidisciplinary%20Design%20and%20Analysis.pdfs"
    />
  );
}
