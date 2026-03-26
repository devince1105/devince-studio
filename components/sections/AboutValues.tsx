//components/sections/AboutValues.tsx

import * as Icons from "lucide-react";

interface AboutValuesProps {
    data: {
        eyebrow: string;
        title: string;
        items: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
}

export default function AboutValues({ data }: AboutValuesProps) {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <p className="text-xs tracking-widest text-gray-400 uppercase">
                        {data.eyebrow}
                    </p>
                    <h2 className="text-4xl font-serif mt-2">
                        {data.title}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {data.items.map((item, i) => {
                        const Icon = (Icons as any)[item.icon];

                        return (
                            <div
                                key={i}
                                className="p-8 bg-white rounded-2xl shadow-sm text-center"
                            >
                                {Icon && <Icon className="mx-auto mb-6 w-6 h-6" />}
                                <h3 className="font-medium text-lg mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
