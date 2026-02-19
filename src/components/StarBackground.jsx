import { useEffect, useRef } from "react";

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * Math.min(window.devicePixelRatio, 2);
      canvas.height = height * Math.min(window.devicePixelRatio, 2);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.scale(
        Math.min(window.devicePixelRatio, 2),
        Math.min(window.devicePixelRatio, 2),
      );
    };

    setSize();

    const starCount = width < 768 ? 250 : 700;

    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200,
        size: Math.random() * 2 + 0.5,
      });
    }

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      for (let star of stars) {
        star.z -= 0.0025;

        if (star.z <= 0) {
          star.z = 200;
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        }

        const scale = 200 / star.z;
        const x = (star.x - width / 2) * scale + width / 2;
        const y = (star.y - height / 2) * scale + height / 2;

        const opacity = 1 - star.z / 200;

        ctx.beginPath();
        ctx.arc(x, y, star.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: "#050505",
      }}
    />
  );
}
