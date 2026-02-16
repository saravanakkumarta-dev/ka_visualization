import { Container, Typography, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function CategoryGallery() {
  const { category } = useParams();

  const imageCounts = {
    exterior: 5,
    interior: 8,
    commercial: 2,
  };

  const images = Array.from(
    { length: imageCounts[category] || 0 },
    (_, i) => `/${category}/${category.slice(0, 3)}${i + 1}.webp`
  );

  return (
    <>
      <Helmet>
        <title>{category} | KA Visualization</title>
      </Helmet>

      <Container
        maxWidth="lg"
        sx={{ mt: 14, mb: 10, position: "relative", zIndex: 2 }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 6, letterSpacing: "3px", textTransform: "uppercase" }}
        >
          {category}
        </Typography>

        <Grid container spacing={4}>
          {images.map((src, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} xs={12} sm={6} md={4} key={index}>
              <Box
                component={motion.img}
                src={src}
                alt=""
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid rgba(201,162,39,0.25)",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}