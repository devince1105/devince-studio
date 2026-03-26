//components/sections/AboutStats.tsx

interface AboutStatsProps {
    data: {
        value: string;
        label: string;
    }[];
}

export default function AboutStats({ data }: AboutStatsProps) {
    return (
        <section className="py-24 bg-gray-100">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

                {data.map((stat, i) => (
                    <div key={i}>
                        <div className="text-4xl font-serif mb-2">
                            {stat.value}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">
                            {stat.label}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
