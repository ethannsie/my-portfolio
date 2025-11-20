import TemplatePage from "../../../components/TemplatePage";

export default function MarkovMusic() {
  return (
    <TemplatePage
      title="Markov Music Generator"
      subtitle="A basic machine learning model that generates music using Markov chains"
      timeline="May 2025 – June 2025"
      contributors={["Ethan Sie"]}
      techStack={["Python", "NumPy", "Fluidsynth", "ElementTree API", "XML"]}
      description={`
This project generates musical melodies using a first and second order Markov model.

Features:
- Converts MIDI files into Markov stochastic matrices
- Probabilistically generates new sequences from a random initial state
- Supports various semitones and steady state analysis

This was my first experiment blending ML and music theory.
      `}
      images={[
        "/images/projects/markov/markov1.png",
        "/images/projects/markov/markov2.png",
        "/images/projects/markov/markov3.png",
        "/images/projects/markov/markov4.png",
      ]}
      githubUrl="https://github.com/ethannsie/xmlMusicGen"
      demoUrl=""
      videoUrl="https://www.youtube.com/embed/EYFOyBBCSiA?si=ZitsLtg4v2VxrdPv"
    />
  );
}
