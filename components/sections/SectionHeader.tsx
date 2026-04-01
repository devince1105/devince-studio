//components/sections/SectionHeader.tsx

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: "left" | "center";
}

export default function SectionHeader({
    eyebrow,
    title,
    subtitle,
    align = "left",
}: SectionHeaderProps) {

    const alignment =
        align === "center"
            ? "text-center items-center"
            : "text-left items-start";

    return (
        <section className="py-24">
            <div className={`max-w-6xl mx-auto px-6 lg:px-8 flex flex-col ${alignment}`}>

                {eyebrow && (
                    <p className="text-xs tracking-widest uppercase text-gray-400 dark:text-zinc-500 mb-6">
                        {eyebrow}
                    </p>
                )}

                <h1 className="text-5xl font-serif text-gray-900 dark:text-zinc-100">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-6 text-gray-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                )}

            </div>
        </section>
    );
}
