//componens/sections/ValuesGrid.tsx
"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueItem {
    icon?: string; // JSON 來的一定是 string
    title: string;
    description: string;
}

interface ValuesGridProps {
    eyebrow?: string;
    title?: string;
    items?: ValueItem[]; // 防禦：避免 undefined.map
}

export default function ValuesGrid({ eyebrow, title, items = [] }: ValuesGridProps) {
    return (
        <section className="py-24 transition-colors duration-300">
            <div className="container mx-auto px-6 text-center max-w-5xl">
                {eyebrow && (
                    <p className="text-xs tracking-widest uppercase text-gray-400 dark:text-zinc-500 mb-4">
                        {eyebrow}
                    </p>
                )}

                {title && <h2 className="text-4xl font-serif mb-16 text-gray-900 dark:text-zinc-100">{title}</h2>}

                <div className="grid md:grid-cols-3 gap-12">
                    {items.map((item, index) => {
                        const Icon =
                            item.icon && item.icon in Icons
                                ? (Icons[item.icon as keyof typeof Icons] as unknown as LucideIcon)
                                : null;

                        return (
                            <div
                                key={index}
                                className="
                                    mx-auto
                                    w-72 h-72
                                    bg-teal-50
                                    dark:bg-teal-900/10
                                    rounded-full
                                    flex flex-col
                                    items-center
                                    justify-center
                                    p-10
                                    text-center
                                    transition-colors
                                    duration-300
                                "
                            >
                                {Icon && (
                                    <div className="mb-4 flex justify-center">
                                        <Icon className="w-8 h-8 text-teal-500 dark:text-teal-400" strokeWidth={1.5} />
                                    </div>
                                )}

                                <h3 className="text-xl font-medium mb-3 text-teal-500 dark:text-teal-400">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 dark:text-zinc-500 text-sm leading-relaxed px-4">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
