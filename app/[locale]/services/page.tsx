// app/[locale]/services/page.tsx
import SectionHeader from "@/components/sections/SectionHeader";
import ServicesSection from "@/components/sections/ServicesSection";
import ServicesContact from "@/components/sections/ServicesContact";

import en from "@/data/locales/en/services.json";
import tw from "@/data/locales/tw/services.json";
import jp from "@/data/locales/jp/services.json";

const servicesContentMap = {
    en,
    tw,
    jp,
};

type Locale = keyof typeof servicesContentMap;

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default async function ServicesPage({ params }: PageProps) {
    const { locale } = await params;

    const safeLocale: Locale =
        locale in servicesContentMap
            ? (locale as Locale)
            : "en";

    const content = servicesContentMap[safeLocale];

    return (
        <div className="max-w-screen-xl mx-auto">
            <SectionHeader {...content.header} />

            {content.sections.map((section, index) => (
                <ServicesSection
                    key={section.title}
                    {...section}
                    reverse={index % 2 !== 0}
                />
            ))}

            <ServicesContact {...content.contact} />
        </div>
    );
}
