"use client";
import React, { useState, useRef } from "react";

interface PricingStageProps {
    data: {
        title: string;
        subtitle: string;
        cta: string;
    };
    pricingData: any[];
}

export default function PricingStage({ data, pricingData }: PricingStageProps) {
    const [activeIndex, setActiveIndex] = useState(2);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, cardIndex: -1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y, cardIndex: index });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0, cardIndex: -1 });
    };

    return (
        <section id="pricing" className="py-40 px-6 bg-background transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-32 relative z-10">
                    <h2 className="text-5xl md:text-6xl font-serif mb-6 text-gray-900 dark:text-zinc-100 tracking-tight">
                        {data.title}
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {data.subtitle}
                    </p>
                </div>

                <div className="relative h-[650px] flex items-center justify-center [perspective:1200px] mt-10">
                    {pricingData.map((plan: any, index: number) => {
                        const isActive = index === activeIndex;
                        const isHovered = mousePos.cardIndex === index;
                        const diff = index - activeIndex;
                        
                        let rotateYBase = 0;
                        let translateX = 0;
                        let zIndex = 10;
                        let opacity = 1;
                        let scale = 0.95;

                        if (isActive) {
                            rotateYBase = 0;
                            translateX = 0;
                            zIndex = 100;
                            opacity = 1;
                            scale = 1.1;
                        } else {
                            const baseGap = 240;
                            rotateYBase = diff > 0 ? -25 : 25;
                            
                            if (index === 0) {
                                translateX = diff * 210 - 20;
                            } else if (index === 1) {
                                translateX = diff * 220;
                            } else {
                                translateX = diff * baseGap;
                            }

                            zIndex = 50 - Math.abs(diff) * 10;
                            opacity = 0.6;
                            scale = 0.9;
                        }

                        // CodePen Spark: Mouse Tilt Logic
                        const tiltX = isHovered ? mousePos.y * -20 : 0;
                        const tiltY = isHovered ? mousePos.x * 20 : 0;
                        const innerTranslateX = isHovered ? mousePos.x * -15 : 0;
                        const innerTranslateY = isHovered ? mousePos.y * -15 : 0;

                        return (
                            <div
                                key={plan.id}
                                onClick={() => setActiveIndex(index)}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={handleMouseLeave}
                                className={`absolute w-[320px] h-[540px] rounded-[2.5rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer group overflow-hidden
                                    ${plan.highlight 
                                        ? "bg-teal-600 dark:bg-teal-700 text-white border border-teal-400/30" 
                                        : "bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 border border-neutral-100 dark:border-zinc-800"
                                    }
                                    ${isActive 
                                        ? "shadow-[0_40px_100px_rgba(0,0,0,0.25)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)]" 
                                        : "grayscale-[0.4] opacity-60"
                                    }
                                    ${isHovered ? "z-[110]" : ""}
                                `}
                                style={{
                                    transform: `translateX(${translateX}px) rotateY(${rotateYBase + (isHovered ? mousePos.x * 40 : 0)}deg) rotateX(${isHovered ? mousePos.y * -40 : 0}deg) scale(${isHovered ? scale * 1.05 : scale})`,
                                    zIndex: isHovered ? 200 : zIndex,
                                    opacity: isActive ? 1 : opacity,
                                    transformStyle: "preserve-3d"
                                }}
                            >
                                {/* ✨ Shiny Spotlight Border Effect */}
                                {isHovered && (
                                    <div 
                                        className="absolute inset-0 pointer-events-none z-50 opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(1000px circle at ${mousePos.x * 320 + 160}px ${mousePos.y * 540 + 270}px, rgba(45, 212, 191, 0.4), transparent 30%)`,
                                            mixBlendMode: 'overlay'
                                        }}
                                    />
                                )}
                                
                                {isHovered && (
                                    <div 
                                        className="absolute inset-0 z-40 rounded-[2.5rem] border-[2px] border-white/40 pointer-events-none opacity-50"
                                        style={{
                                            maskImage: `radial-gradient(circle at ${mousePos.x * 320 + 160}px ${mousePos.y * 540 + 270}px, black 0%, transparent 60%)`,
                                            WebkitMaskImage: `radial-gradient(circle at ${mousePos.x * 320 + 160}px ${mousePos.y * 540 + 270}px, black 0%, transparent 60%)`,
                                        }}
                                    />
                                )}

                                {/* The "Parallax" content layer */}
                                <div 
                                    className="p-10 h-full flex flex-col items-center text-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                    style={{
                                        transform: `translateX(${innerTranslateX}px) translateY(${innerTranslateY}px) translateZ(80px)`
                                    }}
                                >
                                    <h3 className={`text-2xl font-medium mb-1 ${plan.highlight ? "text-white" : "text-gray-900 dark:text-zinc-100"}`}>
                                        {plan.title}
                                    </h3>
                                    
                                    <p className={`text-[10px] uppercase tracking-widest font-semibold mb-8 ${plan.highlight ? "text-teal-100" : "text-zinc-400 dark:text-zinc-500"}`}>
                                        {plan.desc}
                                    </p>

                                    <div className="mb-10">
                                        <div className="text-3xl font-bold">{plan.price}</div>
                                    </div>

                                    <ul className={`space-y-4 mb-10 text-[13px] flex-1 ${plan.highlight ? "text-white/90" : "text-gray-600 dark:text-zinc-400 opacity-80"}`}>
                                        {plan.features.slice(0, 5).map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-left leading-relaxed">
                                                <span className={`shrink-0 ${plan.highlight ? "text-white" : "text-teal-400"}`}>✔</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all
                                            ${plan.highlight
                                                ? isActive ? "bg-white text-teal-600 hover:bg-zinc-100" : "bg-white/20 text-white pointer-events-none"
                                                : isActive
                                                ? "bg-black dark:bg-zinc-100 text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-white"
                                                : "bg-neutral-200 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-600 pointer-events-none"
                                            }`}
                                    >
                                        {plan.cta || data.cta}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-20 relative z-10">
                    <p className="text-sm text-gray-400 dark:text-zinc-500 italic max-w-lg mx-auto">
                        一頁式網站未來可升級為完整網站，<br />
                        專案總額可折抵部分費用。
                    </p>
                </div>
            </div>
        </section>
    );
}
