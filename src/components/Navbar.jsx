import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme, useMediaQuery } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Portfolio", path: "/portfolio" },
];

const worksSections = [
  { label: "Exterior", id: "exterior" },
  { label: "Interior", id: "interior" },
  { label: "Commercial", id: "commercial" },
  { label: "360° Panorama", id: "panorama" },
  { label: "Walkthrough", id: "walkthrough" },
];

export default function Navbar() {
  const location = useLocation();
  const isWorksPage = location.pathname === "/works";

  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near top
      if (currentScrollY < 100) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scroll Down
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      }

      // Scroll Up
      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleOpen = (event) => {
    if (isWorksPage) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleScrollToSection = (id) => {
    handleClose();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <AppBar
        elevation={0}
        sx={{
          background: "transparent",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 3, md: 6 },
          }}
        >
          {/* Left Menu */}
          {isMobile ? (
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  sx={menuStyle}
                >
                  {item.label}
                </Button>
              ))}

              {/* Works */}
              <Box onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                <Button component={NavLink} to="/works" sx={menuStyle}>
                  Works
                </Button>

                {isWorksPage && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                      onMouseLeave: handleClose,
                    }}
                    PaperProps={{
                      sx: {
                        background: "#111",
                        border: "1px solid rgba(201,162,39,0.2)",
                      },
                    }}
                  >
                    {worksSections.map((section) => (
                      <MenuItem
                        key={section.id}
                        onClick={() => handleScrollToSection(section.id)}
                        sx={dropdownStyle}
                      >
                        {section.label}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            </Box>
          )}
          {/* Logo */}
          <motion.img
            layoutId="ka-logo"
            src="/logo/ka-logo-transparent.webp"
            style={{
              height: "50px",
              objectFit: "contain",
            }}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            background: "#111",
            width: "70%",
            borderLeft: "1px solid rgba(201,162,39,0.2)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {[...menuItems, { label: "Works", path: "/works" }].map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.path}
              onClick={toggleDrawer}
              sx={{
                textAlign: "center",
                "&.active": { color: "#C9A227" },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </motion.div>
  );
}

const menuStyle = {
  color: "#fff",
  fontSize: "13px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  position: "relative",

  "&.active": {
    color: "#C9A227",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 4,
    left: 0,
    width: "0%",
    height: "1px",
    background: "#C9A227",
    transition: "0.3s ease",
  },

  "&:hover::after": {
    width: "100%",
  },

  "&.active::after": {
    width: "100%",
  },
};

const dropdownStyle = {
  color: "#fff",
  fontSize: "13px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  "&:hover": {
    color: "#C9A227",
    background: "transparent",
  },
};
