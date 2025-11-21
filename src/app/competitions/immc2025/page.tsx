import TemplatePage from "../../../components/TemplatePage";

export default function IMMC2025() {
  return (
    <TemplatePage
      title="International Mathematical Modeling Challenge 2025"
      subtitle="Global Volleyball League Optimization: MILP Scheduling & Markov Chain Competitive Modeling"
      timeline="2025 | 5 Day Competition"
      contributors={["Ethan Sie", "Ethan Sharma", "Ryan Park", "Jackie Zeng"]}
      techStack={["GeoPy", "NumPy","Pandas", "Seaborn", "PuLP"]}
      description={`
Developed an optimized 20-team global sports-league schedule balancing fairness, travel efficiency, and competitive quality. Used mixed-integer linear programming (MILP) to generate matchups and season timing, and applied Markov Chain analysis to evaluate matchup fairness. Built metrics for effectivity and attractiveness, then ran Monte Carlo simulations to compare knockout, Swiss, and round-robin formats. Extended the model to a 24-team league with optimized opponent counts.

Concepts Applied:
- Mixed-Integer Linear Programming (MILP)
- Graph/network optimization
- Markov Chains for competitive parity
- Probability modeling for match outcomes
- Optimization under constraints (rest time, travel distance)
- Monte Carlo simulation
- Ranking/effectivity statistical metrics
      `}
      images={[
        
      ]}
      githubUrl=""
      demoUrl=""
      videoUrl=""
      pdfView="https://vgatltf8hagpubgw.public.blob.vercel-storage.com/Modeling%20Paper%20%7C%20IMMC%202025%20.pdf"
    />
  );
}
