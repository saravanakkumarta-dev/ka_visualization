import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";

export default function Hero() {
  const handleScrollToFeatured = () => {
    const element = document.getElementById("featured-projects");
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Helmet>
        <title>KA Visualization | Architectural Visualization Studio</title>
        <meta
          name="description"
          content="Premium architectural visualization studio offering exterior, interior, commercial renders and immersive 360° experiences."
        />
      </Helmet>

      <Box>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              letterSpacing: { xs: "3px", md: "6px" },
              mb: 2,
            }}
          >
            KA Visualization
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#C9A227",
              letterSpacing: "4px",
              mb: 3,
            }}
          >
            ARCHITECTURAL VISUALIZATION STUDIO
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: "600px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.7)",
              mb: 5,
              lineHeight: 1.8,
            }}
          >
            Premium exterior, interior and commercial architectural
            visualization crafted with precision, realism and artistic depth.
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {/* View Works */}
            <Button
              component={RouterLink}
              to="/works"
              variant="outlined"
              sx={{
                borderColor: "#C9A227",
                color: "#C9A227",
                padding: "10px 32px",
                letterSpacing: "3px",
                "&:hover": {
                  borderColor: "#C9A227",
                  backgroundColor: "rgba(201,162,39,0.08)",
                },
              }}
            >
              VIEW WORKS
            </Button>

            {/* Featured Projects Scroll */}
            <Button
              onClick={handleScrollToFeatured}
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.8)",
                padding: "10px 32px",
                letterSpacing: "3px",
                "&:hover": {
                  borderColor: "#C9A227",
                  color: "#C9A227",
                  backgroundColor: "rgba(201,162,39,0.08)",
                },
              }}
            >
              FEATURED PROJECTS
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}
