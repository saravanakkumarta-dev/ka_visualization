import { motion } from "framer-motion";
import { base } from "../baseUrl";

export default function IntroLoader({ onFinish }) {
  const handleVideoEnd = () => {
    onFinish();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={styles.container}
    >
      <video
        src={`${base}video/intro.webm`}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={styles.video}
      />
    </motion.div>
  );
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    background: "#000",
    zIndex: 9999,
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "95%",
    maxHeight: "95%",
    objectFit: "contain",
  },
};
