import TemplatePage from "../../../components/TemplatePage";

export default function CubeSAT() {
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
      pdfView="https://vgatltf8hagpubgw.public.blob.vercel-storage.com/Developing%20and%20Testing%20a%201U%20CubeSat%20using%20COTS%20Hardware%20%20%281%29.pdf"
    />
  );
}
