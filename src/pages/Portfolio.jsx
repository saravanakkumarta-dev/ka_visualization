import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import GoldDivider from "../components/GoldDivider";

const ConstructionScene = lazy(() =>
  import("../components/ConstructionScene")
);

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | KA Visualization</title>
        <meta
          name="description"
          content="Portfolio section of KA Visualization. Premium architectural visualization projects will be showcased here."
        />
      </Helmet>

      <div className="portfolio-container">
        <div className="fade-up">
          <h1 className="portfolio-title">PORTFOLIO</h1>

          <GoldDivider />

          <p className="portfolio-text">
            Currently under development.
            A curated collection of premium architectural visualizations
            will be showcased here soon.
          </p>

          <Suspense fallback={null}>
            <ConstructionScene />
          </Suspense>
        </div>
      </div>
    </>
  );
}