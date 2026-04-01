interface Props {
    data: {
        eyebrow: string;
        title: string;
        subtitle: string;
    };
}

export default function CaseHeader({ data }: Props) {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <p className="text-sm tracking-widest uppercase text-gray-400">
                    {data.eyebrow}
                </p>

                <h1 className="text-5xl font-serif mt-4">
                    {data.title}
                </h1>

                <p className="mt-6 text-gray-500 max-w-2xl">
                    {data.subtitle}
                </p>
            </div>
        </section>
    );
}
