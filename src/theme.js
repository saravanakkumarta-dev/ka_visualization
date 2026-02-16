import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C9A227", // antique gold
    },
    background: {
      default: "#050505",
      paper: "rgba(0,0,0,0.6)",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {
      letterSpacing: "2px",
    },
  },
});

export default theme;