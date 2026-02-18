import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import IntroLoader from "./components/IntroLoader";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { Box } from "@mui/material";

const StarBackground = lazy(() => import("./components/StarBackground"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Works = lazy(() => import("./pages/Works"));
const ScrollToTopButton = lazy(() => import("./components/ScrollToTopButton"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/portfolio"
            element={
              <PageWrapper>
                <Portfolio />
              </PageWrapper>
            }
          />
          <Route
            path="/works"
            element={
              <PageWrapper>
                <Works />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      style={{ position: "relative", zIndex: 2 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <StarBackground />
      </Suspense>
      <AnimatePresence mode="wait">
        {!introFinished && (
          <IntroLoader onFinish={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {introFinished && (
        <div style={{ position: "relative", zIndex: 2 }}>
          <Suspense fallback={<PageLoader />}>
            <Navbar />
          </Suspense>
          <Box
            sx={{
              pt: "80px",
              px: { xs: 2, sm: 4, md: 6 },
            }}
          >
            <AnimatedRoutes />
          </Box>
          <Suspense fallback={null}>
            <ScrollToTopButton />
          </Suspense>
          <Suspense fallback={<PageLoader />}>
            <Footer />
          </Suspense>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
