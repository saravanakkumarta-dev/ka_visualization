import { Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import GoldDivider from "../components/GoldDivider";
import { useState } from "react";
import LightboxOverlay from "../components/LightboxOverlay";

const sections = [
  {
    id: "exterior",
    title: "Exterior",
    images: ["ext1", "ext2", "ext3", "ext4", "ext5"],
    path: "exterior/",
  },
  {
    id: "interior",
    title: "Interior",
    images: ["int1", "int2", "int3", "int4", "int5", "int6", "int7", "int8"],
    path: "interior/",
  },
  {
    id: "commercial",
    title: "Commercial",
    images: ["com1img", "com2img"],
    path: "commercial/",
  },
];

export default function Works() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    component={motion.img}
                    src={`${section.path}${img}.webp`}
                    loading="lazy"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => {
                      setCurrentImages(
                        section.images.map(
                          (image) => `${section.path}${image}.webp`,
                        ),
                      );
                      setCurrentIndex(i);
                      setLightboxOpen(true);
                    }}
                    sx={{
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid rgba(201,162,39,0.25)",
                      cursor: "pointer",
                    }}
                  />
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

          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%",
              border: "1px solid rgba(201,162,39,0.25)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/a4Kz0-k8y7E"
              title="360 Panorama"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </Box>

          <GoldDivider />
        </Box>

        {/* WALKTHROUGH */}
        <Box id="walkthrough" sx={{ mt: 12 }}>
          <Typography variant="h4" sx={{ mb: 6, letterSpacing: "3px" }}>
            Walkthrough
          </Typography>

          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%",
              border: "1px solid rgba(201,162,39,0.25)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/O3AoYsqt2mM"
              title="Walkthrough"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </Box>
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
