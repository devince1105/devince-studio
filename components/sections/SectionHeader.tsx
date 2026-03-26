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
            <div className={`container mx-auto px-6 flex flex-col ${alignment}`}>

                {eyebrow && (
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">
                        {eyebrow}
                    </p>
                )}

                <h1 className="text-5xl font-serif">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-6 text-gray-500 ">
                        {subtitle}
                    </p>
                )}

            </div>
        </section>
    );
}
