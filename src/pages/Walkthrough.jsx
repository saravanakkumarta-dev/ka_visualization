import { Container, Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function Panorama() {
  return (
    <>
      <Helmet>
        <title>Walkthrough | KA Visualization</title>
      </Helmet>

      <Container sx={{ mt: 14, mb: 10, zIndex: 2 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Walkthrough
        </Typography>

        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%",
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
      </Container>
    </>
  );
}