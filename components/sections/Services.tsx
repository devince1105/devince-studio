// components/sections/Services.tsx

interface ServicesProps {
    data: {
        eyebrow: string;
        title: string;
        items: {
            title: string;
            description: string;
        }[];
    };
}

export default function Services({ data }: ServicesProps) {
    return (
        <section className="py-32">
            <div className="container mx-auto px-6">

                <p className="text-xs tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
                    {data.eyebrow}
                </p>

                <h2 className="text-4xl font-serif mt-2 mb-16 text-gray-900 dark:text-zinc-100">
                    {data.title}
                </h2>

                <div className="grid md:grid-cols-2 gap-16">
                    {data.items.map((item, index) => (
                        <div key={index}>
                            <h3 className="text-xl mb-2 text-gray-900 dark:text-zinc-100">{item.title}</h3>
                            <p className="text-gray-500 dark:text-zinc-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
