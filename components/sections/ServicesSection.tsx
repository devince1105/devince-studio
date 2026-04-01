//components/sections/ServicesSection.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ServicesSectionProps {
    title: string;
    description: string;
    features: string[];
    imageSrc?: string;
    reverse?: boolean;
}

export default function ServicesSection({
    title,
    description,
    features,
    imageSrc,
    reverse = false,
}: ServicesSectionProps) {
    const [imgError, setImgError] = useState(false);

    const hasImage = Boolean(imageSrc && imageSrc.trim() !== "");
    const showImage = hasImage && !imgError;

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">

                {/* Image */}
                <div
                    className={`
            relative w-full h-96 rounded-xl overflow-hidden
            ${reverse ? "md:order-2" : "md:order-1"}
        `}
                >
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
                            <span className="text-gray-400 text-sm tracking-wide">
                                No Image
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={`${reverse ? "md:order-1 pl-8" : "md:order-2 "}`}>
                    <h3 className="text-3xl font-serif mb-6">{title}</h3>

                    <p className="text-gray-600 mb-8">{description}</p>

                    <ul className="space-y-3 text-gray-500 text-sm">
                        {features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}
