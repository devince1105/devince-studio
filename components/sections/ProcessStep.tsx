//components/sections/ProcessStep.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

interface ProcessStepProps {
    index: number;
    title: string;
    description: string;
    duration?: string;
    bullets?: { title: string; description?: string }[];
    imageSrc?: string;
    reverse?: boolean;
    isLast?: boolean; // ✅ 最後一個 step 隱藏直線
}

export default function ProcessStep({
    index,
    title,
    description,
    duration,
    bullets = [],
    imageSrc,
    reverse = false,
    isLast = false,
}: ProcessStepProps) {
    const [imgError, setImgError] = useState(false);
    const hasImage = Boolean(imageSrc && imageSrc.trim() !== "");
    const showImage = hasImage && !imgError;

    return (
        <section className="py-20">
            {/* ✅ 3 欄：Timeline / Content / Image */}
            <div className="container mx-auto px-6 grid md:grid-cols-[72px_1fr_1fr] gap-12 items-start">
                {/* Timeline */}
                <div className="relative flex justify-center w-16">

                    {/* 圓球 */}
                    <div className="relative z-10 w-10 h-10 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center">
                        {String(index).padStart(2, "0")}
                    </div>

                </div>

                {/* Content */}
                <div className={reverse ? "md:order-3" : "md:order-2"}>
                    <h3 className="text-4xl font-serif">{title}</h3>

                    <p className="mt-4 text-gray-600 leading-relaxed max-w-xl">
                        {description}
                    </p>

                    {bullets.length > 0 && (
                        <ul className="mt-8 space-y-4">
                            {bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    {/* icon */}
                                    <div className="mt-0">
                                        <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-gray-700" />
                                        </div>
                                    </div>

                                    {/* text */}
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {b.title}
                                        </p>

                                        {b.description && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {b.description}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {duration && (
                        <div className="mt-8 inline-flex px-4 py-2 rounded-full bg-gray-100 text-xs tracking-wide text-gray-600">
                            {duration}
                        </div>
                    )}
                </div>

                {/* Image */}
                <div className={reverse ? "md:order-2" : "md:order-3"}>
                    <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gray-100">
                        {showImage ? (
                            <Image
                                src={imageSrc!}
                                alt={title}
                                fill
                                className="object-cover"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
