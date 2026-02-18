import { Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import GoldDivider from "../components/GoldDivider";
import { useState, useEffect } from "react";
import LightboxOverlay from "../components/LightboxOverlay";
import LuxuryVideoGallery from "../components/LuxuryVideoGallery";

const sections = [
  {
    id: "exterior",
    title: "Exterior",
    images: ["ext1", "ext2", "ext3", "ext4", "ext5", "ext6", "ext7", "ext8"],
    path: "exterior/",
  },
  {
    id: "interior",
    title: "Interior",
    images: [
      "int1",
      "int2",
      "int3",
      "int4",
      "int5",
      "int6",
      "int7",
      "int8",
      "int9",
      "int10",
    ],
    path: "interior/",
  },
  {
    id: "commercial",
    title: "Commercial",
    images: ["com1img", "com2img"],
    path: "commercial/",
  },
];

const panoramaVideos = ["https://www.youtube.com/embed/a4Kz0-k8y7E"];

const walkthroughVideos = [
  "https://www.youtube.com/embed/O3AoYsqt2mM",
  "https://www.youtube.com/embed/yWLRJB4TGrA?si=we10W8Qqxny3tFnI",
  "https://www.youtube.com/embed/4YhSWgTF4L0?si=2a_TpaYoXivHpzfH",
];

const worksSections = [
  { label: "Exterior", id: "exterior" },
  { label: "Interior", id: "interior" },
  { label: "Commercial", id: "commercial" },
  { label: "360° Panorama", id: "panorama" },
  { label: "Walkthrough", id: "walkthrough" },
];

export default function Works() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -100; // adjust based on navbar height
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };
  return (
    <>
      <Helmet>
        <title>Works | KA Visualization</title>
        <meta
          name="description"
          content="Explore exterior, interior, commercial, 360 panorama and walkthrough architectural visualization projects by KA Visualization."
        />
      </Helmet>

      <Container
        maxWidth="lg"
        sx={{
          mt: 14,
          mb: 10,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            letterSpacing: "4px",
            mb: 2,
          }}
        >
          OUR WORKS
        </Typography>

        <GoldDivider />
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {worksSections.map((section) => (
            <Typography
              key={section.id}
              onClick={() => handleScrollToSection(section.id)}
              sx={{
                cursor: "pointer",
                fontSize: "13px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
                position: "relative",
                transition: "0.3s ease",

                "&:hover": {
                  color: "#C9A227",
                },

                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: "0%",
                  height: "1px",
                  background: "#C9A227",
                  transition: "0.3s ease",
                },

                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {section.label}
            </Typography>
          ))}
        </Box>
        {sections.map((section) => (
          <Box key={section.id} id={section.id} sx={{ mt: 12 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 6,
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              {section.title}
            </Typography>

            <Grid container spacing={4}>
              {section.images.map((img, i) => (
                <Grid key={i} size={{ xs: 12, sm: 12, md: 6 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 10",
                      overflow: "hidden",
                      borderRadius: "10px",
                      border: "1px solid rgba(201,162,39,0.25)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCurrentImages(
                        section.images.map(
                          (image) => `${section.path}${image}.webp`,
                        ),
                      );
                      setCurrentIndex(i);
                      setLightboxOpen(true);
                    }}
                  >
                    <Box
                      component={motion.img}
                      src={`${section.path}${img}.webp`}
                      loading="lazy"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.5 }}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <GoldDivider />
          </Box>
        ))}

        {/* 360 PANORAMA */}
        <Box id="panorama" sx={{ mt: 12 }}>
          <Typography variant="h4" sx={{ mb: 6, letterSpacing: "3px" }}>
            360° Panorama
          </Typography>
          <LuxuryVideoGallery videos={panoramaVideos} />
          <GoldDivider />
        </Box>

        {/* WALKTHROUGH */}
        <Box id="walkthrough" sx={{ mt: 12 }}>
          <Typography variant="h4" sx={{ mb: 6, letterSpacing: "3px" }}>
            Walkthrough
          </Typography>
          <LuxuryVideoGallery videos={walkthroughVideos} />
        </Box>

        <LightboxOverlay
          open={lightboxOpen}
          images={currentImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      </Container>
    </>
  );
}
