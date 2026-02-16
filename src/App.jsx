import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import StarBackground from "./components/StarBackground";
import IntroLoader from "./components/IntroLoader";
import Navbar from "./components/Navbar";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Works = lazy(() => import("./pages/Works"));

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
                <Hero />
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
      <StarBackground />

      <AnimatePresence mode="wait">
        {!introFinished && (
          <IntroLoader onFinish={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      {introFinished && (
        <div style={{ position: "relative", zIndex: 2 }}>
          <Navbar />
          <div style={{ paddingTop: "80px" }}>
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
