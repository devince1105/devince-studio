// components/sections/MapSection.tsx

interface MapSectionProps {
    data?: {
        embedUrl: string;
    };
}

export default function MapSection({ data }: MapSectionProps) {
    if (!data?.embedUrl) return null;

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="rounded-2xl overflow-hidden shadow-sm">
                    <iframe
                        src={data.embedUrl}
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-[450px]"
                    />
                </div>
            </div>
        </section>
    );
}
