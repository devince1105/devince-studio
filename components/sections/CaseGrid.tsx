//components/sections/CaseGrid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface Project {
    title: string;
    description: string;
    imageSrc?: string;
    year: string;
    category: string;
    tags?: string[];
}

interface Props {
    projects: Project[];
}

export default function CaseGrid({ projects }: Props) {

    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter(p => p.category === activeCategory);

    return (
        <section className="py-24">

            {/* 🔥 Tabs */}
            <div className="flex justify-center gap-6 mb-16 text-sm tracking-wide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full transition ${
                            activeCategory === cat
                                ? "bg-black text-white"
                                : "text-gray-400 hover:text-black"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
                {filteredProjects.map((project, index) => (
                    <div key={index}>

                        {/* Image */}
                        <div className="relative w-full h-96 rounded-xl overflow-hidden">
                            {project.imageSrc ? (
                                <Image
                                    src={project.imageSrc}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">
                                        No Image
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        {project.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h3 className="text-2xl font-serif mt-4">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 mt-2">
                            {project.description}
                        </p>

                        {/* Year */}
                        <div className="text-sm text-gray-400 mt-4">
                            {project.year}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
