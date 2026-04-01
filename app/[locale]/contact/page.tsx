// app/[locale]/contact/page.tsx
import SectionHeader from "@/components/sections/SectionHeader";
import MapSection from "@/components/sections/MapSection";
import ContactInfo from "@/components/sections/ContactInfo";
import ContactForm from "@/components/sections/ContactForm";

import en from "@/data/locales/en/contact.json";
import tw from "@/data/locales/tw/contact.json";
import jp from "@/data/locales/jp/contact.json";

const contactContentMap = { en, tw, jp };
type Locale = keyof typeof contactContentMap;

interface PageProps {
    params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
    const { locale } = await params;

    const safeLocale: Locale = locale in contactContentMap ? (locale as Locale) : "en";
    const content = contactContentMap[safeLocale];

    return (
        <div className="max-w-screen-xl mx-auto px-6">
            <SectionHeader {...content.header} align="left" />
            {/* Strategy 3: Unified Header & Hero Area */}
            <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 ml-12">
                {/* Trust Block - Integrated closer to the action */}
                <div className="mt-8 max-w-2xl border-l-2 border-teal-500 pl-8 space-y-4">
                    <h3 className="text-lg font-serif italic text-gray-900 dark:text-zinc-100">
                        {safeLocale === "tw" ? "我們如何協助您成功？" : "How we help you succeed?"}
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                        {[
                            { tw: "客製化設計，不使用模板", en: "Custom design, no templates" },
                            { tw: "專注轉換與商業價值", en: "Focus on conversion and business value" },
                            { tw: "前端 + 系統整合能力", en: "Frontend + System integration" },
                            { tw: "透明的開發流程與進度", en: "Transparent development process" }
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-zinc-400">
                                <span className="text-teal-500 font-bold mt-0.5">✔</span>
                                {safeLocale === "tw" ? item.tw : item.en}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <section className="mb-40 ml-12">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    {/* Form Component */}
                    <div className="lg:col-span-8">
                        <ContactForm data={content.form} />
                    </div>

                    {/* Info Component */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <ContactInfo data={content.info} />
                    </div>
                </div>
            </section>

            {/* Map at the very bottom with subtle styling - Temporarily Hidden per user request */}
            {/* 
            <div className="opacity-30 hover:opacity-100 transition-opacity duration-1000">
                <MapSection data={content.map} />
            </div>
            */}
        </div>
    );
}
