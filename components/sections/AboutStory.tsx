//components/sections/AboutStory.tsx

"use client";

import Image from "next/image";
import { useState } from "react";

interface AboutStoryProps {
    data: {
        eyebrow: string;
        title: string;
        paragraphs: string[];
        imageSrc?: string;
    };
}

export default function AboutStory({ data }: AboutStoryProps) {
    const [imgError, setImgError] = useState(false);

    const hasImage = Boolean(data.imageSrc && data.imageSrc.trim() !== "");
    const showImage = hasImage && !imgError;

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">

                {/* Image */}
                <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                    {showImage ? (
                        <Image
                            src={data.imageSrc!}
                            alt={data.title}
                            fill
                            className="object-cover"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-zinc-900 flex items-center justify-center">
                            <span className="text-gray-400 dark:text-zinc-600 text-sm tracking-wide">
                                No Image
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="h-86 content-start transition-colors duration-300">
                    <p className="text-xs tracking-widest text-gray-400 dark:text-zinc-500 uppercase mb-3">
                        {data.eyebrow}
                    </p>

                    <h2 className="text-4xl font-serif mb-6 text-gray-900 dark:text-zinc-100">
                        {data.title}
                    </h2>

                    {data.paragraphs.map((p, i) => (
                        <p
                            key={i}
                            className="text-gray-600 dark:text-zinc-400 mb-4 leading-relaxed"
                        >
                            {p}
                        </p>
                    ))}
                </div>

            </div>
        </section>
    );
}
