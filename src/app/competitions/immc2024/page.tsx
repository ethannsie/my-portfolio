import TemplatePage from "../../../components/TemplatePage";

export default function IMMC2024() {
  return (
    <TemplatePage
      title="International Mathematical Modeling Challenge 2024"
      subtitle="Pet Readiness & Retention Modeling Using HR-SPLIT and Stochastic Forecasting"
      timeline="2024 | 5 Day Competition"
      contributors={["Ethan Sie", "Ethan Sharma", "Ryan Park", "Jackie Zeng"]}
      techStack={["Matplotlib, SciPy, Pandas, NumPy"]}
      description={`
Built a multi-factor mathematical model to evaluate pet-ownership readiness in households and predict long-term pet retention globally. Developed the custom HR-SPLIT (Hyper-Rectangular Space Partitioning with Linear Inequalities Technique) system to classify readiness and applied probability distributions to country-level data. Extended the model using stochastic differential equations to forecast pet populations and abandonment rates 5–15 years into the future.
      
Concepts Applied:
- Linear inequality modeling (HR-SPLIT)
- High-dimensional partitioning / classification
- Probability distributions: normal, gamma, density functions
- Stochastic Differential Equations (SDEs)
- Euler–Maruyama approximation
- Sensitivity analysis
- Probabilistic modeling and simulation
- Parameter fitting for probability distributions
- Time-series projection under uncertainty

`}
      images={[
        
      ]}
      githubUrl=""
      demoUrl=""
      videoUrl=""
      pdfView="https://vgatltf8hagpubgw.public.blob.vercel-storage.com/Modeling%20Paper%20%7C%20IMMC%202024%20.pdf"
    />
  );
}
