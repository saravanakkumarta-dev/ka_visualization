import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LightboxOverlay from "./LightboxOverlay";

const images = Array.from(
  { length: 7 },
  (_, i) => `/fp_slideAnimation/fp_sl${i + 1}.webp`,
);

export default function FeaturedProjectsSlider() {
  const baseDelay = 4000;
  const manualDelay = 8000;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [delay, setDelay] = useState(baseDelay);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleCount = isMobile ? 3 : 5;

  // Determine current group
  const groupIndex = Math.floor(current / visibleCount);
  const start = groupIndex * visibleCount;
  const end = start + visibleCount;

  const visibleImages = images.slice(start, end);

  const hasLeft = start > 0;
  const hasRight = end < images.length;

  // Auto Slide
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setDelay(baseDelay);
    }, delay);

    return () => clearInterval(interval);
  }, [paused, delay]);

  const goToNextGroup = () => {
    const newStart = end;
    if (newStart >= images.length) return;

    setDirection(1);
    setCurrent(newStart);
    setDelay(manualDelay);
  };

  const goToPrevGroup = () => {
    const newStart = start - visibleCount;
    if (newStart < 0) return;

    setDirection(-1);
    setCurrent(newStart);
    setDelay(manualDelay);
  };

  return (
    <Box
      id="featured-projects"
      sx={{
        mt: 16,
        mb: 20,
        scrollMarginTop: "120px", // 👈 THIS replaces manual offset
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", letterSpacing: "4px", mb: 8 }}
      >
        FEATURED PROJECTS
      </Typography>

      {/* Main Slider */}
      <Box
        sx={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: "14px",
          cursor: "pointer",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <Box
            key={current}
            component={motion.img}
            src={images[current]}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            onClick={() => {
              setLightboxOpen(true);
              setDelay(manualDelay);
            }}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AnimatePresence>
      </Box>

      {/* Thumbnails with Pagination */}
      <Box
        sx={{
          mt: 4,
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          overflowX: "auto",
          overflowY: "hidden",
          boxSizing: "border-box",
        }}
      >
        {hasLeft && (
          <IconButton onClick={goToPrevGroup} sx={{ color: "#C9A227" }}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {visibleImages.map((img, index) => {
          const realIndex = start + index;

          return (
            <Box
              key={realIndex}
              component="img"
              src={img}
              onClick={() => {
                setDirection(realIndex > current ? 1 : -1);
                setCurrent(realIndex);
                setDelay(manualDelay);
              }}
              sx={{
                width: 100,
                height: 70,
                objectFit: "cover",
                border:
                  realIndex === current
                    ? "2px solid #C9A227"
                    : "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                borderRadius: "6px",
                opacity: realIndex === current ? 1 : 0.7,
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
            />
          );
        })}

        {hasRight && (
          <IconButton onClick={goToNextGroup} sx={{ color: "#C9A227" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>

      <LightboxOverlay
        open={lightboxOpen}
        images={images}
        currentIndex={current}
        setCurrentIndex={setCurrent}
        onClose={() => setLightboxOpen(false)}
      />
    </Box>
  );
}
