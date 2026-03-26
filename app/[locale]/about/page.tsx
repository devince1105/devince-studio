//app/[locale]/about/page.tsx

import SectionHeader from "@/components/sections/SectionHeader";
import ValuesGrid from "@/components/sections/ValuesGrid";
import Contact from "@/components/sections/Contact";

import AboutStory from "@/components/sections/AboutStory";
import AboutTeam from "@/components/sections/AboutTeam";
import AboutStats from "@/components/sections/AboutStats";

import en from "@/data/locales/en/about.json";
import tw from "@/data/locales/tw/about.json";
import jp from "@/data/locales/jp/about.json";

const aboutContentMap = {
    en,
    tw,
    jp,
};

type Locale = keyof typeof aboutContentMap;

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params;

    const safeLocale: Locale =
        locale in aboutContentMap
            ? (locale as Locale)
            : "en";

    const content = aboutContentMap[safeLocale];

    return (
        <div className="max-w-screen-xl mx-auto">
            {/* 共用 SectionHeader */}
            <SectionHeader {...content.header} />

            <AboutStory data={content.story} />

            <ValuesGrid {...content.values} />

            <AboutTeam data={content.team} />

            <AboutStats data={content.stats} />

            {/* 共用 Contact */}
            <Contact data={content.contact} />
        </div>
    );
}
