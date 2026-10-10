"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroWebGL() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfafafc, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    // Optimized pixel ratio: 1.5 is crisp on Retina, uses 55% less GPU fill rate than 2.0
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 1. Core Geometric Polyhedron
    const icoGeometry = new THREE.IcosahedronGeometry(4.2, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x111827,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, wireframeMat);
    sceneGroup.add(icosahedron);

    // 2. Inner Glowing Core Sphere
    const innerGeometry = new THREE.IcosahedronGeometry(2.6, 1);
    const innerWireframe = new THREE.MeshBasicMaterial({
      color: 0x374151,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerWireframe);
    sceneGroup.add(innerMesh);

    // 3. Ambient Particle Constellation (Floating Points - optimized count)
    const particleCount = 380;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(17, 24, 39, 1)");
        gradient.addColorStop(0.4, "rgba(55, 65, 81, 0.6)");
        gradient.addColorStop(1, "rgba(17, 24, 39, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x111827,
      size: 0.22,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneGroup.add(particles);

    // Mouse Tracking with Inertia
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Animation Loop with Visibility Optimization
    let animationFrameId: number | null = null;
    let isVisible = true;
    const timer = new THREE.Timer();
    timer.connect(document);

    const animate = (timestamp: number) => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      timer.update(timestamp);
      const elapsedTime = timer.getElapsed();

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      icosahedron.rotation.x = elapsedTime * 0.08 + currentMouseY * 0.4;
      icosahedron.rotation.y = elapsedTime * 0.12 + currentMouseX * 0.4;

      innerMesh.rotation.x = -elapsedTime * 0.12 - currentMouseY * 0.3;
      innerMesh.rotation.y = -elapsedTime * 0.16 + currentMouseX * 0.3;

      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      sceneGroup.position.x = currentMouseX * 1.5;
      sceneGroup.position.y = currentMouseY * 1.2 - (scrollY * 0.003);
      sceneGroup.rotation.z = currentMouseX * 0.1;

      camera.position.z = 14 + (scrollY * 0.005);

      renderer.render(scene, camera);
    };

    // Intersection Observer: Pause loop when scrolled offscreen to save 100% GPU for the rest of the site!
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) {
            animate(performance.now());
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);
    animate(performance.now());

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      icoGeometry.dispose();
      innerGeometry.dispose();
      particlesGeometry.dispose();
      wireframeMat.dispose();
      innerWireframe.dispose();
      particlesMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-85 transition-opacity duration-1000"
    />
  );
}
