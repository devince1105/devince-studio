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
        <div className="max-w-screen-xl mx-auto">
            <SectionHeader {...content.header} />
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20">

                        <div className="lg:col-span-4">
                            <ContactInfo data={content.info} />
                        </div>

                        <div className="lg:col-span-8">
                            <ContactForm data={content.form} />
                        </div>

                    </div>
                </div>
            </section>
            <MapSection data={content.map} />
        </div>
    );
}
