//components/sections/ServicesContact.tsx

import Link from "next/link";

interface ServicesContactProps {
    title: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
}

export default function ServicesContact({
    title,
    description,
    buttonLabel,
    buttonHref,
}: ServicesContactProps) {
    return (
        <section className="py-32">
            <div className="container mx-auto px-6 text-center max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">
                    {title}
                </h2>

                {description && (
                    <p className="text-gray-600 mb-10 leading-relaxed">
                        {description}
                    </p>
                )}

                <Link
                    href={buttonHref}
                    className="inline-flex items-center justify-center
                    px-8 py-3
                    text-sm tracking-wide
                    bg-black text-white
                    rounded-full
                    transition hover:opacity-80"
                >
                    {buttonLabel}
                </Link>
            </div>
        </section>
    );
}
