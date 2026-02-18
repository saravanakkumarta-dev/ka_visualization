import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  LineBasicMaterial,
  GridHelper,
  Group,
  EdgesGeometry,
  BoxGeometry,
  LineSegments,
  CylinderGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";

export default function ConstructionScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new Scene();

    // Camera
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    const size = 340;
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    // GOLD LINE MATERIAL
    const lineMaterial = new LineBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0,
    });

    // Blueprint Grid
    const grid = new GridHelper(10, 20, 0xc9a227, 0x444444);
    grid.material.opacity = 0;
    grid.material.transparent = true;
    scene.add(grid);

    // Building Group
    const building = new Group();
    scene.add(building);

    const levels = 3;
    const levelHeight = 1.2;
    const structures = [];

    // Slabs
    for (let i = 0; i < levels; i++) {
      const geometry = new EdgesGeometry(
        new BoxGeometry(4, 0.3, 3)
      );

      const slab = new LineSegments(
        geometry,
        lineMaterial.clone()
      );

      slab.position.y = i * levelHeight;
      building.add(slab);
      structures.push(slab);
    }

    // Columns
    const columnGeometry = new CylinderGeometry(0.05, 0.05, 3.5, 8);

    const columnMaterial = new MeshBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0,
    });

    const columnPositions = [
      [-1.8, 1.5, -1.2],
      [1.8, 1.5, -1.2],
      [-1.8, 1.5, 1.2],
      [1.8, 1.5, 1.2],
    ];

    const columns = columnPositions.map((pos) => {
      const col = new Mesh(
        columnGeometry,
        columnMaterial.clone()
      );
      col.position.set(...pos);
      col.scale.y = 0;
      building.add(col);
      return col;
    });

    let animationId;
    let progress = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      progress += 0.01;

      // Fade in grid
      if (progress < 0.3) {
        grid.material.opacity = progress * 3;
      }

      // Raise columns
      if (progress > 0.3 && progress < 0.8) {
        columns.forEach((col) => {
          col.material.opacity = 1;
          col.scale.y = Math.min((progress - 0.3) * 2, 1);
        });
      }

      // Fade in slabs
      if (progress > 0.8) {
        structures.forEach((slab, i) => {
          slab.material.opacity = Math.min(
            (progress - 0.8) * 2 - i * 0.2,
            1
          );
        });
      }

      // Subtle floating motion after completion
      if (progress > 2) {
        building.rotation.y += 0.002;
        building.position.y = Math.sin(progress * 0.5) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        margin: "0 auto",
        width: "340px",
        height: "340px",
      }}
    />
  );
}