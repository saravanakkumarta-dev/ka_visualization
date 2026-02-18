import { Container, Typography, Box, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import GoldDivider from "../components/GoldDivider";
import { base } from "../baseUrl";

export default function About() {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <>
      <Helmet>
        <title>About | KA Visualization</title>
        <meta
          name="description"
          content="KA Visualization is a premium architectural visualization studio based in Tirupur, Tamil Nadu, delivering high-quality exterior, interior, commercial and 2D design renders."
        />
      </Helmet>

      <Container
        maxWidth="lg"
        sx={{
          mt: 14,
          mb: 10,
          position: "relative",
          zIndex: 2,
          color: "#fff",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* SECTION TITLE */}
          <Typography
            variant="h3"
            sx={{
              letterSpacing: "4px",
              fontWeight: 500,
              textAlign: "center",
              mb: 2,
            }}
          >
            About KA Visualization
          </Typography>

          <GoldDivider />

          {/* BRAND PHILOSOPHY */}
          <Typography
            sx={{
              fontSize: "1.15rem",
              lineHeight: 1.9,
              mb: 5,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            KA Visualization is a premium architectural visualization studio
            dedicated to transforming architectural concepts into immersive
            visual experiences. Every project is approached with precision,
            realism, and a commitment to refined design aesthetics.
          </Typography>

          <Typography
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.9,
              mb: 8,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            The studio specializes in high-quality exterior renders, interior
            visualization, commercial architectural designs, 2D plans, and
            immersive 360° panorama walkthroughs — enabling clients to clearly
            see and experience their projects before they are built.
          </Typography>
          <GoldDivider />
          {/* FOUNDER SECTION */}
          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent="center"
            sx={{
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {/* PROFILE IMAGE */}
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <motion.div ref={imageRef} style={{ y }}>
                <motion.img
                  src={`${base}profile/profile.webp`}
                  alt="Adhishivan K"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `
    0 0 40px rgba(201,162,39,0.25),
    0 0 80px rgba(201,162,39,0.15)
  `,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    borderRadius: "12px",
                    border: "1px solid rgba(201,162,39,0.25)",
                    cursor: "pointer",
                  }}
                />
              </motion.div>
            </Grid>

            {/* FOUNDER TEXT */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: "#C9A227",
                  letterSpacing: "2px",
                }}
              >
                The Founder
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.9,
                  mb: 4,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                KA Visualization was founded by Adhishivan K, a Civil Engineer
                based in Tirupur, Tamil Nadu. With a strong technical foundation
                and a deep interest in architectural aesthetics, he combines
                engineering precision with artistic vision to deliver realistic
                and compelling visualizations.
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Beyond project execution, he actively engages in building design
                projects and offers professional design classes for aspiring
                architects and designers who want to master architectural
                visualization techniques.
              </Typography>
            </Grid>
          </Grid>
          <GoldDivider />

          {/* SERVICES BLOCK */}
          <Box sx={{ mt: 10 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                letterSpacing: "3px",
              }}
            >
              Expertise & Services
            </Typography>

            <Typography sx={serviceText}>
              • Exterior Architectural Visualization
            </Typography>
            <Typography sx={serviceText}>
              • Interior Rendering & Spatial Design
            </Typography>
            <Typography sx={serviceText}>
              • 2D Floor Plans & Technical Layouts
            </Typography>
            <Typography sx={serviceText}>
              • 360° Panorama Walkthroughs
            </Typography>
            <Typography sx={serviceText}>
              • Commercial Space Visualization
            </Typography>
          </Box>
          <GoldDivider />
          {/* CLOSING STATEMENT */}
          <Box sx={{ mt: 10 }}>
            <Typography
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              KA Visualization continues to deliver visual excellence while
              maintaining a commitment to clarity, realism, and architectural
              integrity — ensuring every design is experienced with confidence
              before construction begins.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </>
  );
}

const serviceText = {
  fontSize: "1.05rem",
  lineHeight: 2,
  color: "rgba(255,255,255,0.75)",
};
