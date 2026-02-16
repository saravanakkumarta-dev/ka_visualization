import { Container, Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ConstructionScene from "../components/ConstructionScene";
import GoldDivider from "../components/GoldDivider";

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

      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          pt: 16,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            sx={{
              letterSpacing: "6px",
              fontWeight: 500,
              mb: 2,
            }}
          >
            PORTFOLIO
          </Typography>

          <GoldDivider />

          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.75)",
              mb: 6,
            }}
          >
            Currently under development.  
            A curated collection of premium architectural visualizations
            will be showcased here soon.
          </Typography>

          <ConstructionScene />
        </motion.div>
      </Container>
    </>
  );
}