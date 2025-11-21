import TemplatePage from "../../../components/TemplatePage";

export default function MMC2025() {
  return (
    <TemplatePage
      title="Mathematical Contest in Modeling  2025"
      subtitle="Olympic Medal Prediction Using Tobit Models, Mixed-Effects Regression, and DBSCAN Clustering"
      timeline="2025 | 5 Day Competition"
      contributors={["Ethan Sie", "Ryan Park", "Ethan Sharma"]}
      techStack={["scikit-learn", "sqlite3", "Pandas", "SciPy", "NumPy", "Seaborn", "Matplotlib"]}
      description={`
      Created a full predictive framework for the 2028 Olympics medal table using censored-data regression (Tobit model) and a hierarchical mixed-linear-effects model. Used DBSCAN clustering to categorize countries by performance tiers and applied negative binomial and probit regressions to forecast medal counts—especially for zero-medal nations. Extended the project by detecting the “Great Coach Effect” using time-series analysis and Singular Value Decomposition to identify coach-driven performance anomalies.

      Concepts Applied:
      - Tobit regression for censored data
      - Hierarchical Mixed-Effects Models (MLMs)
      - Negative Binomial Regression
      - Probit models (zero-inflation)
      - Clustering via DBSCAN
      - Singular Value Decomposition (SVD)
      - Time-series analysis & moving averages
      `}
      images={[
        
      ]}
      githubUrl=""
      demoUrl=""
      videoUrl=""
      pdfView="https://vgatltf8hagpubgw.public.blob.vercel-storage.com/Modeling%20Paper%20%7C%20MCM%202025%20.pdf"
    />

  );
  
}
