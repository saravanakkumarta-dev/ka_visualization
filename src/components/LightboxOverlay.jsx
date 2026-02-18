import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function LightboxOverlay({
  open,
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) {
  const baseDelay = 4000;
  const manualDelay = 8000;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleCount = isMobile ? 3 : 5;

  const overlayRef = useRef(null);
  const [direction, setDirection] = useState(1);
  const [delay, setDelay] = useState(baseDelay);

  // Auto slide when open
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setDelay(baseDelay);
    }, delay);

    return () => clearInterval(interval);
  }, [open, delay, images.length, setCurrentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!open) return;

      if (e.key === "Escape") {
        onClose();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  //Full screen useEffect
  useEffect(() => {
    if (!overlayRef.current) return;

    if (open) {
      const enterFullscreen = async () => {
        try {
          if (!document.fullscreenElement) {
            await overlayRef.current.requestFullscreen();
          }
        } catch (err) {
          console.log("Fullscreen not supported", err);
        }
      };

      enterFullscreen();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [open]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setDelay(manualDelay);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setDelay(manualDelay);
  };

  // Thumbnail group logic
  const groupIndex = Math.floor(currentIndex / visibleCount);
  const start = groupIndex * visibleCount;
  const end = start + visibleCount;

  const visibleImages = images.slice(start, end);
  const hasLeft = start > 0;
  const hasRight = end < images.length;

  const goToNextGroup = () => {
    const newStart = end;
    if (newStart >= images.length) return;

    setDirection(1);
    setCurrentIndex(newStart);
    setDelay(manualDelay);
  };

  const goToPrevGroup = () => {
    const newStart = start - visibleCount;
    if (newStart < 0) return;

    setDirection(-1);
    setCurrentIndex(newStart);
    setDelay(manualDelay);
  };

  return (
    <AnimatePresence>
      {open && (
        <Box
          ref={overlayRef}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(8px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              width: "90vw",
              maxWidth: "1200px",
            }}
          >
            {/* Main Image */}
            <Box
              sx={{
                position: "relative",
                aspectRatio: "16 / 9",
                overflow: "hidden",
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <Box
                  key={images[currentIndex]}
                  component={motion.img}
                  src={images[currentIndex]}
                  custom={direction}
                  initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.8, 0.25, 1],
                  }}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </AnimatePresence>
            </Box>

            {/* Close */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                color: "#C9A227",
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Prev */}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: -60,
                color: "#C9A227",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* Next */}
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: -60,
                color: "#C9A227",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Thumbnail Pagination */}
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
                      setDirection(realIndex > currentIndex ? 1 : -1);
                      setCurrentIndex(realIndex);
                      setDelay(manualDelay);
                    }}
                    sx={{
                      width: 90,
                      height: 70,
                      objectFit: "cover",
                      border:
                        realIndex === currentIndex
                          ? "2px solid #C9A227"
                          : "1px solid rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      borderRadius: "6px",
                      opacity: realIndex === currentIndex ? 1 : 0.7,
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
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
