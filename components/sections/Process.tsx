//components/sections/Process.tsx
interface ProcessProps {
    data: {
        eyebrow: string;
        title: string;
        steps: {
            id: string;
            title: string;
            desc: string;
            duration: string;
        }[];
    };
}

export default function Process({ data }: ProcessProps) {
    return (
        <section className="py-32">
            <div className="container mx-auto px-6 max-w-5xl">

                <p className="text-xs tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
                    {data.eyebrow}
                </p>

                <h2 className="text-4xl font-serif mt-2 mb-20 text-gray-900 dark:text-zinc-100">
                    {data.title}
                </h2>

                <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-zinc-800" />

                    <div className="space-y-20">
                        {data.steps.map((step) => (
                            <div key={step.id} className="relative pl-20">

                                <div className="absolute left-0 top-1">
                                    <div className="w-12 h-12 rounded-full border border-gray-900 dark:border-zinc-700 flex items-center justify-center text-sm font-medium bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-colors">
                                        {step.id}
                                    </div>
                                </div>

                                <h3 className="text-xl mb-3 font-medium text-gray-900 dark:text-zinc-100">
                                    {step.title}
                                </h3>

                                <p className="text-gray-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                                    {step.desc}
                                </p>

                                <div className="mt-4 inline-block text-xs px-3 py-1 bg-gray-100 dark:bg-zinc-900 rounded-full text-gray-600 dark:text-zinc-500 transition-colors">
                                    {step.duration}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
