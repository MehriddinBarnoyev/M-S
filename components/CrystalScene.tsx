"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The 3D finale: a glass crystal heart slowly turning above
 * a golden diamond ring, wrapped in drifting gold sparkles.
 */
export default function CrystalScene({ calm = false }: { calm?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const calmRef = useRef(calm);
  calmRef.current = calm; // updated each render; read inside the animation loop

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // A phone with WebGL blocked would otherwise throw here and take the
    // whole page down with it — the finale is worth less than the site.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
      });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    const maxDpr = window.innerWidth < 640 ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.2, 6);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // ── Crystal heart ─────────────────────────────────────
    const shape = new THREE.Shape();
    shape.moveTo(25, 25);
    shape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    shape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    shape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    shape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    shape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    shape.bezierCurveTo(35, 0, 25, 25, 25, 25);

    const heartGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 24,
      bevelEnabled: true,
      bevelThickness: 8,
      bevelSize: 8,
      bevelSegments: 5,
      curveSegments: 24,
    });
    heartGeo.center();

    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0xef9fb2,
      metalness: 0,
      roughness: 0.08,
      transmission: 0.55,
      thickness: 8,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      iridescence: 0.55,
      iridescenceIOR: 1.3,
      emissive: 0x5c1f2e,
      emissiveIntensity: 0.55,
      envMapIntensity: 1.5,
      transparent: true,
      opacity: 0.96,
    });

    const heart = new THREE.Mesh(heartGeo, heartMat);
    heart.scale.setScalar(0.016);
    heart.rotation.z = Math.PI;
    const heartGroup = new THREE.Group();
    heartGroup.add(heart);
    heartGroup.position.y = 0.75;
    scene.add(heartGroup);

    // ── Ring with diamond ─────────────────────────────────
    const ringGroup = new THREE.Group();
    const band = new THREE.Mesh(
      new THREE.TorusGeometry(0.52, 0.055, 32, 96),
      new THREE.MeshStandardMaterial({
        color: 0xd8b978,
        metalness: 1,
        roughness: 0.12,
      })
    );
    ringGroup.add(band);

    const setting = new THREE.Mesh(
      new THREE.ConeGeometry(0.1, 0.14, 6),
      new THREE.MeshStandardMaterial({ color: 0xd8b978, metalness: 1, roughness: 0.15 })
    );
    setting.position.y = 0.58;
    setting.rotation.x = Math.PI;
    ringGroup.add(setting);

    const diamond = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.16, 0),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 0.85,
        thickness: 0.6,
        ior: 2.42,
        clearcoat: 1,
        flatShading: true,
        transparent: true,
      })
    );
    diamond.position.y = 0.72;
    diamond.scale.y = 1.35;
    ringGroup.add(diamond);
    ringGroup.position.y = -1.35;
    scene.add(ringGroup);

    // ── Lights ────────────────────────────────────────────
    const key = new THREE.PointLight(0xffe9c4, 30, 30);
    key.position.set(3, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0xe8b4b8, 20, 30);
    rim.position.set(-4, -1, 3);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0x223055, 2));

    // ── Gold sparkles ─────────────────────────────────────
    const sparkleCount = 260;
    const positions = new Float32Array(sparkleCount * 3);
    const phases = new Float32Array(sparkleCount);
    for (let i = 0; i < sparkleCount; i++) {
      const r = 1.6 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const sparkleGeo = new THREE.BufferGeometry();
    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const sparkles = new THREE.Points(
      sparkleGeo,
      new THREE.PointsMaterial({
        color: 0xf3d9a4,
        size: 0.035,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(sparkles);

    // ── Sizing / interaction / loop ───────────────────────
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    let raf = 0;
    let frameN = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;

      // In "calm" mode (while she's using the date-planner) throttle to
      // ~30fps and skip the per-particle sparkle update, so the 3D scene
      // stops competing with the UI for the main thread.
      const calm = calmRef.current;
      frameN++;
      if (calm && frameN % 2 === 0) return;

      const t = clock.getElapsedTime();

      heartGroup.rotation.y = t * 0.35;
      heartGroup.position.y = 0.75 + Math.sin(t * 0.9) * 0.12;
      heart.rotation.x = Math.sin(t * 0.5) * 0.06;

      ringGroup.rotation.y = -t * 0.5;
      ringGroup.rotation.x = 0.35 + Math.sin(t * 0.7) * 0.08;
      ringGroup.position.y = -1.35 + Math.sin(t * 0.9 + 1.5) * 0.08;
      diamond.rotation.y = t * 1.2;

      sparkles.rotation.y = t * 0.06;
      if (!calm) {
        const pos = sparkleGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < sparkleCount; i++) {
          pos.setY(i, pos.getY(i) + Math.sin(t * 1.4 + phases[i]) * 0.0012);
        }
        pos.needsUpdate = true;
      }

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (0.2 - mouse.y * 0.35 - camera.position.y) * 0.03;
      camera.lookAt(0, -0.1, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      renderer.dispose();
      pmrem.dispose();
      heartGeo.dispose();
      sparkleGeo.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
