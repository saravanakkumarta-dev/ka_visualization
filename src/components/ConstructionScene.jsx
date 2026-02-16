import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ConstructionScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    const size = 340;
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (!mountRef.current) return;
    mountRef.current.appendChild(renderer.domElement);

    // GOLD MATERIAL
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0,
    });

    // Blueprint Grid
    const grid = new THREE.GridHelper(10, 20, 0xc9a227, 0x444444);
    grid.material.opacity = 0;
    grid.material.transparent = true;
    scene.add(grid);

    // Building Group
    const building = new THREE.Group();
    scene.add(building);

    const levels = 3;
    const levelHeight = 1.2;

    const structures = [];

    for (let i = 0; i < levels; i++) {
      const geometry = new THREE.EdgesGeometry(
        new THREE.BoxGeometry(4, 0.3, 3)
      );

      const slab = new THREE.LineSegments(
        geometry,
        lineMaterial.clone()
      );

      slab.position.y = i * levelHeight;
      building.add(slab);
      structures.push(slab);
    }

    // Vertical columns
    const columnGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3.5, 8);
    const columnMaterial = new THREE.MeshBasicMaterial({
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
      const col = new THREE.Mesh(columnGeometry, columnMaterial.clone());
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

      // After complete → subtle motion
      if (progress > 2) {
        building.rotation.y += 0.002;
        building.position.y = Math.sin(progress * 0.5) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
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