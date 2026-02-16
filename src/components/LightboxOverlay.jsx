import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function LightboxOverlay({
  open,
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) {
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (open) window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // click outside closes
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
          {/* Content Wrapper (NOT full screen) */}
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Main Image */}
            <Box
              component={motion.img}
              key={images[currentIndex]}
              src={images[currentIndex]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              sx={{
                maxWidth: "75vw",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />

            {/* Close Button */}
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
                left: -60,
                color: "#C9A227",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* Next */}
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: -60,
                color: "#C9A227",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Thumbnails */}
            <Box
              sx={{
                position: "absolute",
                right: -120,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              {images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  onClick={() => setCurrentIndex(i)}
                  sx={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    border:
                      i === currentIndex
                        ? "2px solid #C9A227"
                        : "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
