// import { useEffect, useRef } from "react";
// import { base } from "../baseUrl";
// import * as THREE from "three";

// export default function StarBackground() {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       1,
//       1000,
//     );
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     mountRef.current.appendChild(renderer.domElement);

//     const starTexture = new THREE.TextureLoader().load(`${base}textures/star.webp`);

//     const starCount = window.innerWidth < 768 ? 250 : 700;

//     const geometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(starCount * 3);

//     for (let i = 0; i < starCount; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 200;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
//       positions[i * 3 + 2] = -Math.random() * 200;
//     }

//     geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

//     const material = new THREE.PointsMaterial({
//       size: 2.2,
//       map: starTexture,
//       transparent: true,
//       depthWrite: false,
//       blending: THREE.AdditiveBlending,
//       color: new THREE.Color("#D4AF37"),
//     });

//     const stars = new THREE.Points(geometry, material);
//     scene.add(stars);

//     let animationId;

//     const animate = () => {
//       animationId = requestAnimationFrame(animate);

//       // Ultra subtle drift
//       stars.rotation.y += 0.00003;
//       stars.rotation.x += 0.000015;

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("resize", handleResize);

//       if (mountRef.current && renderer.domElement) {
//         mountRef.current.removeChild(renderer.domElement);
//       }

//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div
//       ref={mountRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: 0,
//         background: "#050505",
//       }}
//     />
//   );
// }
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
