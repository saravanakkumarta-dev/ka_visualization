import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function LuxuryVideoGallery({ videos }) {
  if (!videos || videos.length === 0) return null;

  const featured = videos[0];
  const secondary = videos.slice(1);

  const VideoCard = ({ src, featured }) => (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: featured ? "14px" : "10px",
        overflow: "hidden",
        border: featured
          ? "1px solid rgba(201,162,39,0.4)"
          : "1px solid rgba(201,162,39,0.25)",
        boxShadow: featured
          ? "0 20px 50px rgba(0,0,0,0.4)"
          : "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Subtle Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))",
          zIndex: 1,
          pointerEvents: "none",
          transition: "0.4s ease",
        }}
      />

      <iframe
        src={src}
        title="video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {/* 🎬 Featured */}
      <VideoCard src={featured} featured />

      {/* 🎥 Secondary */}
      {secondary.length > 0 && (
        <Grid container spacing={4}>
          {secondary.map((video, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6 }}>
              <VideoCard src={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}