import { Box, Typography, IconButton, Container, Stack } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box
        sx={{
          background: `
    linear-gradient(
      to top,
      rgba(5,5,5,0.05) 0%,
      rgba(5,5,5,0.06) 40%,
      rgba(5,5,5,0.07) 100%
    )
  `,
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          py: 6,
          borderTop: "1px solid rgba(201,162,39,0.2)",
          mt: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr auto 1fr",
              },
              textAlign: { xs: "center", md: "left" },
              alignItems: "center",
              gap: { xs: 4, md: 2 },
            }}
          >
            {/* LEFT — WhatsApp + Mail (Single Line) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                component="a"
                href="https://wa.me/919442697835"
                target="_blank"
                sx={linkStyle}
              >
                +91 9442697835
              </Typography>

              <Typography
                component="a"
                href="mailto:adhishivan.k@gmail.com"
                sx={linkStyle}
              >
                adhishivan.k@gmail.com
              </Typography>
            </Box>

            {/* CENTER — Icons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <IconButton
                component="a"
                href="https://www.instagram.com/ka_visualization"
                target="_blank"
                rel="noopener noreferrer"
                sx={iconStyle}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.youtube.com/@adhishivank"
                target="_blank"
                rel="noopener noreferrer"
                sx={iconStyle}
              >
                <YouTubeIcon />
              </IconButton>

              <IconButton
                component="a"
                href="https://wa.me/919442697835"
                target="_blank"
                rel="noopener noreferrer"
                sx={iconStyle}
              >
                <WhatsAppIcon />
              </IconButton>

              <IconButton
                component="a"
                href="mailto:adhishivan.k@gmail.com"
                sx={iconStyle}
              >
                <MailOutlineIcon />
              </IconButton>
            </Box>

            {/* RIGHT — Brand + Location */}
            <Box
              sx={{
                textAlign: { xs: "center", md: "right" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  letterSpacing: "2px",
                }}
              >
                KA Visualization
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  mt: 0.5,
                }}
              >
                Tirupur, Tamil Nadu, India
              </Typography>
            </Box>
          </Box>

          {/* Copyright */}
          <Typography
            sx={{
              mt: 5,
              textAlign: "center",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            © {new Date().getFullYear()} KA Visualization. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </motion.div>
  );
}

const iconStyle = {
  color: "#C9A227",
  border: "1px solid rgba(201,162,39,0.3)",
  "&:hover": {
    backgroundColor: "rgba(201,162,39,0.1)",
    borderColor: "#C9A227",
  },
};

const linkStyle = {
  color: "rgba(255,255,255,0.75)",
  fontSize: "14px",
  textDecoration: "none",
  transition: "0.3s ease",
  cursor: "pointer",

  "&:hover": {
    color: "#C9A227",
  },
};

{
  /* Social Icons */
}
<Stack direction="row" spacing={2}></Stack>;
