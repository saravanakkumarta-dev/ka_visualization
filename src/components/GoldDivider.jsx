import { motion } from "framer-motion";

export default function GoldDivider() {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: "120px", opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        height: "1px",
        background: "linear-gradient(to right, transparent, #C9A227, transparent)",
        margin: "40px auto",
      }}
    />
  );
}