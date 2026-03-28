"use client";

import React, { useEffect, useRef } from "react";

interface Shape {
    x: number;
    y: number;
    size: number;
    baseSize: number;
    targetSize: number;
    angle: number;
    color: string;
    type: "circle" | "rect" | "pill";
}

export default function ShapeWaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapes = useRef<Shape[]>([]);
    const mouse = useRef({ x: -1000, y: -1000 });
    const waveRadius = 150;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const initShapes = () => {
            const width = canvas.width = window.innerWidth;
            const height = canvas.height = 600; // Match Carousel height
            shapes.current = [];

            const spacing = 45;
            const cols = Math.ceil(width / spacing) + 1;
            const rows = Math.ceil(height / spacing) + 1;

            const colors = ["#2dd4bf", "#38bdf8", "#a855f7", "#ffffff"];

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const type = Math.random() > 0.6 ? "pill" : (Math.random() > 0.5 ? "circle" : "rect");
                    shapes.current.push({
                        x: i * spacing,
                        y: j * spacing,
                        size: 2,
                        baseSize: 2,
                        targetSize: 2,
                        angle: Math.random() * Math.PI,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        type: type as any
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            shapes.current.forEach((shape) => {
                const dx = mouse.current.x - shape.x;
                const dy = mouse.current.y - shape.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Wave Logic
                if (dist < waveRadius) {
                    const force = (waveRadius - dist) / waveRadius;
                    shape.targetSize = shape.baseSize + force * 20;
                    shape.angle += force * 0.1;
                } else {
                    shape.targetSize = shape.baseSize;
                }

                // Smooth scale
                shape.size += (shape.targetSize - shape.size) * 0.1;

                ctx.save();
                ctx.translate(shape.x, shape.y);
                ctx.rotate(shape.angle);
                ctx.globalAlpha = shape.size > 5 ? 0.8 : 0.2;
                ctx.fillStyle = shape.color;

                if (shape.type === "circle") {
                    ctx.beginPath();
                    ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (shape.type === "rect") {
                    ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                } else {
                    // Pill
                    const w = shape.size * 2;
                    const h = shape.size / 2;
                    ctx.beginPath();
                    ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
                    ctx.fill();
                }

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            initShapes();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        
        initShapes();
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
