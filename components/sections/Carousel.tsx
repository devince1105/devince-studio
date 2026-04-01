// component/sections/Carousel.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import ShapeWaveBackground from "./ShapeWaveBackground";
import FlowBackground from "./FlowBackground";

/* 🔥 動態載入 Three（避免 SSR 問題） */
const HeroBackground = dynamic(
  () => import("@/components/three/HeroBackground"),
  { ssr: false }
);

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Crafting AI-Powered Experiences",
    description:
      "結合 AI、全端技術與設計思維，打造具未來感的數位產品。",
    image: "/images/slide1.jpg",
  },
  {
    id: 2,
    title: "3D & Interactive Innovation",
    description:
      "Three.js × WebGL × Modern Frontend，實現沉浸式互動體驗。",
    image: "/images/slide2.jpg",
  },
  {
    id: 3,
    title: "From Concept to Deployment",
    description:
      "從產品設計、系統架構到雲端部署，一站式技術整合。",
    image: "/images/slide3.jpg",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000); // 8s is better for reading
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setMousePos({ x, y });
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[520px] overflow-hidden bg-[#0a1a1b]" // Lighter Teal-dark base
    >
      {/* 🎭 動態漸層與光影層 (Mesh Gradient - Optimized Palette) */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-60">
        {/* Teal Core */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/30 blur-[130px] rounded-full animate-pulse" />
        
        {/* Sky Variation */}
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-sky-400/25 blur-[110px] rounded-full animate-pulse delay-700" />
        
        {/* Purple Accent (Small) */}
        <div className="absolute bottom-[5%] left-[20%] w-[25%] h-[25%] bg-purple-500/20 blur-[90px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* 🌑 Vignette 邊緣陰影 (Softened) */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,26,27,0.4)_100%)]" />

      {/* 🔦 互動式跟隨光 (Light Follow) */}
      <div 
        className="absolute pointer-events-none z-[3] w-[450px] h-[450px] rounded-full bg-sky-300/10 blur-[120px] transition-all duration-500 ease-out"
        style={{ 
          left: `${mousePos.x * 100}%`, 
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)' 
        }}
      />

      {/* ✨ 多樣式背景層 (不同的 Slide 配製不同特效) */}
      <div className="absolute inset-0 z-[4] opacity-80 mix-blend-screen transition-opacity duration-1000">
        
        {/* Slide 0: CodePen Shape Wave (Designer Touch) */}
        {current === 0 && (
          <div className="h-full w-full animate-in fade-in duration-1000">
            <ShapeWaveBackground />
          </div>
        )}

        {/* Slide 1: 3D Matrix Cube (Technical depth) */}
        {current === 1 && (
          <div className="h-full w-full animate-in fade-in duration-1000">
            <HeroBackground variant={1} />
          </div>
        )}

        {/* Slide 2: Flowing Cloud (Organic flow focus) */}
        {current === 2 && (
          <div className="h-full w-full animate-in fade-in duration-1000">
            <FlowBackground />
          </div>
        )}

      </div>
      {/* 內容層 */}
      <div className="relative z-10">
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full relative h-[520px]">
              {/* <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              /> */}

              {/* 文字區 (優化版：漸層 + 玻璃擬態) */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end items-center font-serif text-white text-center px-6 pb-24 z-[5]">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 drop-shadow-2xl">
                    {slide.title}
                    </h2>

                    <p className="text-lg md:text-xl max-w-2xl opacity-80 font-light leading-relaxed">
                    {slide.description}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 左箭頭 (優化版：玻璃擬態 + 動態縮放) */}
        <button
          onClick={prev}
          className="group absolute left-10 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 bg-white/5 hover:bg-teal-400/20 hover:border-teal-400/40 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 z-20 hover:scale-110 active:scale-95 shadow-xl"
          suppressHydrationWarning
        >
          <ChevronLeft className="text-white group-hover:-translate-x-1 transition-transform duration-300" size={20} strokeWidth={1.5} />
        </button>

        {/* 右箭頭 (優化版：玻璃擬態 + 動態縮放) */}
        <button
          onClick={next}
          className="group absolute right-10 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 bg-white/5 hover:bg-teal-400/20 hover:border-teal-400/40 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 z-20 hover:scale-110 active:scale-95 shadow-xl"
          suppressHydrationWarning
        >
          <ChevronRight className="text-white group-hover:translate-x-1 transition-transform duration-300" size={20} strokeWidth={1.5} />
        </button>

        {/* 分頁進度條 (Long Bars) */}
        <div className="absolute bottom-8 w-full flex justify-center gap-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-[2px] transition-all duration-700 rounded-full ${current === index
                ? "w-12 bg-teal-400"
                : "w-6 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
