import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import "./index.css";
import { base } from "./baseUrl";

// Set cursor dynamically so it respects BASE_URL from Vite
try {
  document.body.style.cursor = `url(${base}cursor/gold-cursor.svg) 4 2, auto`;
} catch (e) {
  // ignore on server or if DOM isn't ready
}
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </HelmetProvider>
);