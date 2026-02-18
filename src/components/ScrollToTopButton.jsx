import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          sx={{
            position: "fixed",
            bottom: 40,
            right: 40,
            zIndex: 1500,
          }}
        >
          <IconButton
            onClick={scrollToTop}
            sx={{
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(6px)",
              border: "1px solid #C9A227",
              color: "#C9A227",
              "&:hover": {
                backgroundColor: "rgba(201,162,39,0.1)",
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      )}
    </AnimatePresence>
  );
}
