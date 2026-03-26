//app/[locale]/case/page.tsx

import SectionHeader from "@/components/sections/SectionHeader";
import CaseGrid from "@/components/sections/CaseGrid";
import Contact from "@/components/sections/Contact";

import en from "@/data/locales/en/case.json";
import tw from "@/data/locales/tw/case.json";
import jp from "@/data/locales/jp/case.json";

const caseContentMap = { en, tw, jp };
type Locale = keyof typeof caseContentMap;

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default async function CasePage({ params }: PageProps) {
    const { locale } = await params;

    const safeLocale: Locale =
        locale in caseContentMap
            ? (locale as Locale)
            : "en";

    const content = caseContentMap[safeLocale];

    return (
        <div className="max-w-screen-xl mx-auto">
            <SectionHeader {...content.header} />
            <CaseGrid projects={content.projects} />
            <Contact data={content.contact} />
        </div>
    );
}
