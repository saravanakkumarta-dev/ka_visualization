import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
      }}
    >
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          width: "60px",
          height: "1px",
          background: "#C9A227",
        }}
      />
    </Box>
  );
}