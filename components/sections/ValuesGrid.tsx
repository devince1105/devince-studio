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
        <section className="py-8">
            <div className="container mx-auto px-6 text-center max-w-5xl">
                {eyebrow && (
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">
                        {eyebrow}
                    </p>
                )}

                {title && <h2 className="text-4xl font-serif mb-16">{title}</h2>}

                <div className="grid md:grid-cols-3 gap-12">
                    {items.map((item, index) => {
                        // ✅ 安全取 icon：只有在 lucide-react 內存在才 render
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
    rounded-full
    flex flex-col
    content-start
    p-10
    text-center
    -translate-y-2
  "
                            >
                                {Icon && (
                                    <div className="mb-4 flex justify-center">
                                        <Icon className="w-8 h-8 text-teal-500 mt-6" strokeWidth={1.5} />
                                    </div>
                                )}

                                <h3 className="text-xl font-medium mb-3 text-teal-500">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed">
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
