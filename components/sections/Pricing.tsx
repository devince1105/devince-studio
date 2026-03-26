// components/sections/Pricing.tsx
interface PricingProps {
    locale: string;
    data: {
        title: string;
        subtitle: string;
        cta: string;
    };
}

export default async function Pricing({ locale, data }: PricingProps) {
    const pricingData = (
        await import(`@/data/locales/${locale}/pricing.json`)
    ).default;

    return (
        <section id="pricing" className="py-28 px-6 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                {/* Section Title */}
                <h2 className="text-4xl md:text-5xl font-serif mb-6">
                    {data.title}
                </h2>

                {/* Section Subtitle */}
                <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                    {data.subtitle}
                </p>

                <div className="grid md:grid-cols-3 gap-10">
                    {pricingData.map((plan: any) => (
                        <div
                            key={plan.id}
                            className={`p-10 rounded-2xl transition ${plan.highlight
                                    ? "bg-teal-500/90 border border-teal-300 text-white shadow-md hover:shadow-lg scale-105"
                                    : "bg-gray-50 border border-teal-200 text-gray-600 shadow-md hover:shadow-lg"
                                }`}
                        >
                            {/* Plan Title */}
                            <h3 className="text-xl font-medium tracking-wide mb-4">
                                {plan.title}
                            </h3>

                            {/* Price */}
                            <p className="text-4xl font-semibold mb-6">
                                {plan.price}
                            </p>

                            {/* Features */}
                            <ul
                                className={`space-y-3 text-sm ${plan.highlight ? "text-gray-100" : "text-gray-600"
                                    }`}
                            >
                                {plan.features.map((feature: string, i: number) => (
                                    <li key={i}>• {feature}</li>
                                ))}
                            </ul>

                            {/* CTA */}
                            {plan.highlight && (
                                <div className="mt-8">
                                    <button className="px-6 py-3 bg-white text-black rounded-full text-sm tracking-wide hover:bg-gray-200 transition">
                                        {data.cta}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
