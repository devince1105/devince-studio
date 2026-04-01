//components/sections/AboutStats.tsx

interface AboutStatsProps {
    data: {
        value: string;
        label: string;
    }[];
}

export default function AboutStats({ data }: AboutStatsProps) {
    return (
        <section className="py-24 bg-gray-50 dark:bg-zinc-950/50 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">

                {data.map((stat, i) => (
                    <div key={i} className="group">
                        <div className="text-4xl md:text-5xl font-serif mb-2 text-gray-900 dark:text-white transition-colors">
                            {stat.value}
                        </div>
                        <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-500 font-medium">
                            {stat.label}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
