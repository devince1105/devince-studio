// app/[locale]/process/page.tsx
import SectionHeader from "@/components/sections/SectionHeader";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import ProcessStep from "@/components/sections/ProcessStep";
import ValuesGrid from "@/components/sections/ValuesGrid";
import Contact from "@/components/sections/Contact";

import en from "@/data/locales/en/process.json";
import tw from "@/data/locales/tw/process.json";
import jp from "@/data/locales/jp/process.json";

const processMap = { en, tw, jp };

type Locale = keyof typeof processMap;

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function ProcessPage({ params }: PageProps) {
    const { locale } = await params;

    const safeLocale: Locale =
        locale in processMap ? (locale as Locale) : "en";

    const content = processMap[safeLocale];

    return (
        <div className="max-w-screen-xl mx-auto">
            <SectionHeader {...content.header} />

            <ProcessTimeline>
                {content.steps.map((step, index) => (
                    <ProcessStep
                        key={step.title}
                        index={index + 1}
                        title={step.title}
                        description={step.description}
                        duration={step.duration}
                        imageSrc={step.imageSrc}
                        bullets={step.features.map((f) => ({
                            title: f,
                        }))}
                        reverse={index % 2 !== 0}
                        isLast={index === content.steps.length - 1}
                    />
                ))}
            </ProcessTimeline>

            <ValuesGrid {...content.values} />

            <Contact data={content.cta} />
        </div>
    );
}
