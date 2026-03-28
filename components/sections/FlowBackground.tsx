"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  history: { x: number; y: number }[];
  color: string;
}

export default function FlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const particles: Particle[] = [];
    const numParticles = 80;
    const maxLength = 25;

    const colors = ["#2dd4bf", "#38bdf8", "#a855f7"];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 520;
      particles.length = 0;

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          history: [],
          color: colors[i % colors.length]
        });
      }
    };

    const draw = () => {
      // Soft trail effect for "Flow"
      ctx.fillStyle = "rgba(5, 17, 27, 0.15)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        // Simple Flow Field logic using sine/cosine for an organic flow
        const angle = (Math.sin(p.x * 0.005) + Math.cos(p.y * 0.01)) * Math.PI * 2;
        p.vx += Math.cos(angle) * 0.1;
        p.vy += Math.sin(angle) * 0.1;

        // Friction to keep it smooth
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Update history for trails
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > maxLength) p.history.shift();

        // Draw the "Flowing Cloud" trail
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.4;
        
        ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let i = 1; i < p.history.length; i++) {
          ctx.lineTo(p.history[i].x, p.history[i].y);
        }
        ctx.stroke();
        
        // Add a "Glow" at the tip
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Atmospheric Cloud Fog Overlay
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/1.5);
      grad.addColorStop(0, "rgba(5, 17, 27, 0)");
      grad.addColorStop(1, "rgba(5, 17, 27, 0.8)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", init);
    init();
    draw();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 bg-[#05111b]"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
