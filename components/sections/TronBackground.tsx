"use client";

import React, { useEffect, useRef } from "react";

export default function TronBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let offset = 0;

    const particles: {x: number, y: number, z: number, size: number}[] = [];
    for(let i = 0; i < 100; i++) {
        particles.push({
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 2,
            z: Math.random() * 2,
            size: Math.random() * 1.5 + 0.5
        });
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 520;
    };

    const draw = () => {
      ctx.fillStyle = "#05111b";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      
      // 中央高度區域 (The Corridor/Gate)
      const gateWidth = 120;
      const gateHeight = 80;
      const gateX = centerX - gateWidth/2;
      const gateY = centerY - gateHeight/2;

      const speed = 0.02;
      offset = (offset + speed) % 1;

      // 1. 繪製透視延伸線 (Corridor Perspective Lines)
      ctx.lineWidth = 1;
      const corners = [
          {x: 0, y: 0}, {x: width, y: 0}, 
          {x: 0, y: height}, {x: width, y: height},
          {x: centerX, y: 0}, {x: centerX, y: height}
      ];

      const colors = ["rgba(45, 212, 191, 0.4)", "rgba(56, 189, 248, 0.3)"];

      // 縱向格線
      const gridDensity = 12;
      for (let i = -gridDensity; i <= gridDensity; i++) {
        ctx.strokeStyle = colors[0];
        
        // Bottom Plane
        ctx.beginPath();
        ctx.moveTo(centerX + i * 200, height);
        ctx.lineTo(centerX + i * 40, gateY + gateHeight);
        ctx.stroke();

        // Top Plane
        ctx.beginPath();
        ctx.moveTo(centerX + i * 200, 0);
        ctx.lineTo(centerX + i * 40, gateY);
        ctx.stroke();

        // Side Walls (The "Height in the middle")
        ctx.strokeStyle = colors[1];
        if (Math.abs(i) > 2) {
            ctx.beginPath();
            ctx.moveTo(centerX + i * 200, 0);
            ctx.lineTo(centerX + i * 200, height);
            ctx.globalAlpha = 0.05;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
      }

      // 2. 繪製前進橫向環 (Moving Gate Rings)
      for (let i = 0; i < 8; i++) {
        const linePos = (i + offset) / 8;
        const z = linePos * linePos; // Exponential growth
        
        const w = gateWidth + (width - gateWidth) * z;
        const h = gateHeight + (height - gateHeight) * z;
        const x = centerX - w/2;
        const y = centerY - h/2;

        ctx.strokeStyle = `rgba(45, 212, 191, ${z * 0.5})`;
        ctx.lineWidth = 1 + z * 2;

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 10);
        ctx.stroke();

        // 加深邊角的光影
        ctx.fillStyle = `rgba(45, 212, 191, ${z * 0.1})`;
        ctx.fillRect(x, y, 2, h);
        ctx.fillRect(x + w, y, 2, h);
      }

      // 3. 異次元粒子動畫
      particles.forEach(p => {
          p.z -= speed * 0.6;
          if(p.z <= 0) p.z = 2;

          const px = centerX + (p.x * width) / p.z;
          const py = centerY + (p.y * height) / p.z;
          const s = (2 - p.z) * p.size;

          if(px > 0 && px < width && py > 0 && py < height) {
            ctx.fillStyle = `rgba(168, 85, 247, ${1 - p.z/2})`;
            ctx.beginPath();
            ctx.arc(px, py, s, 0, Math.PI * 2);
            ctx.fill();
          }
      });

      // 4. 中央光源氣氛 (Atmospheric Glow)
      const glow = ctx.createRadialGradient(centerX, centerY, gateHeight/2, centerX, centerY, width/2);
      glow.addColorStop(0, "rgba(45, 212, 191, 0.1)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // 邊緣淡出
      const edgeVignette = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width / 1.5);
      edgeVignette.addColorStop(0, "transparent");
      edgeVignette.addColorStop(1, "#05111b");
      ctx.fillStyle = edgeVignette;
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
