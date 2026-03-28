//components/sections/Contact.tsx

import Link from "next/link";

interface ContactProps {
    data: {
        eyebrow?: string;
        title: string;
        highlight?: string;
        description?: string;
        buttonLabel: string;
        buttonHref: string; // 必填
    };
    variant?: "default" | "hero";
}

export default function Contact({
    data,
    variant = "default",
}: ContactProps) {
    const isHero = variant === "hero";

    return (
        <section
            className={`${isHero ? "py-40 text-center" : "py-32 text-center"
                }`}
        >
            <div className="container mx-auto px-6 max-w-3xl">

                {data.eyebrow && (
                    <p className="text-xs tracking-widest uppercase text-gray-400 dark:text-zinc-500 mb-6">
                        {data.eyebrow}
                    </p>
                )}

                <h2
                    className={`font-serif text-gray-900 dark:text-zinc-100 ${isHero
                            ? "text-6xl mb-8"
                            : "text-4xl md:text-5xl mb-6"
                        }`}
                >
                    {data.title}
                    {data.highlight && (
                        <span className="italic"> {data.highlight}</span>
                    )}
                </h2>

                {data.description && (
                    <p className="text-gray-600 dark:text-zinc-400 mb-10 leading-relaxed">
                        {data.description}
                    </p>
                )}

                <Link
                    href={data.buttonHref}
                    className="inline-flex items-center justify-center
            px-8 py-3
            text-sm tracking-wide
            bg-black dark:bg-white
            text-white dark:text-black
            rounded-full
            transition hover:opacity-80"
                >
                    {data.buttonLabel}
                </Link>
            </div>
        </section>
    );
}
