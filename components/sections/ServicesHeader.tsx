// components/sections/ServicesHeader.tsx

interface ServicesHeaderProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
}

export default function ServicesHeader({
    eyebrow,
    title,
    subtitle,
}: ServicesHeaderProps) {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                {eyebrow && (
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">
                        {eyebrow}
                    </p>
                )}

                <h1 className="text-5xl font-serif mt-4">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-6 text-gray-500 max-w-2xl">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
