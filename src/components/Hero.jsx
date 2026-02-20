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
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #000)",
          pointerEvents: "none",
        },
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
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 40, md: 70 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 3,
        }}
        onClick={handleScrollToFeatured}
      >
        {/* Animated Vertical Line */}
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        >
          <Box
            sx={{
              width: "2px",
              height: { xs: 60, md: 90 },
              background:
                "linear-gradient(to bottom, rgba(201,162,39,0.9), rgba(201,162,39,0.15))",
              borderRadius: "2px",
            }}
          />
        </motion.div>

        {/* Discover Section */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          {/* Soft Golden Halo */}
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "220px",
              height: "70px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(201,162,39,0.35) 0%, rgba(201,162,39,0.15) 40%, transparent 75%)",
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />

          {/* Animated Gradient Text */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(90deg, #C9A227, #F0D27A, #C9A227)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                letterSpacing: "8px",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              DISCOVER
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
}
