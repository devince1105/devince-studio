// component/sections/Carousel.tsx
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { div } from "three/tsl";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 999000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="relative w-full h-[520px] overflow-hidden bg-teal-100/50">
      {/* 🔥 Three 背景層 */}
      <div className="absolute inset-0 z-0 ">
        <HeroBackground variant={current} />
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

              {/* 文字區（🔥下移版本） */}
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end items-center font-serif text-white text-center px-6 pb-24">
                <h2 className="text-4xl md:text-5xl font-medium tracking-wide mb-4 drop-shadow-md">
                  {slide.title}
                </h2>

                <p className="text-lg md:text-xl max-w-2xl opacity-90 drop-shadow-sm">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 左箭頭 */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft />
        </button>

        {/* 右箭頭 */}
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm"
        >
          <ChevronRight />
        </button>

        {/* 小圓點 */}
        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${current === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
                }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
