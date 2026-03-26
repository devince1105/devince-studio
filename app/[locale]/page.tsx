// app/[locale]/page.tsx

import Carousel from "@/components/sections/Carousel";
import Pricing from "@/components/sections/Pricing";
import Intro from "@/components/sections/Intro";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = locale ?? "en";

  const content = (
    await import(`@/data/locales/${safeLocale}/home.json`)
  ).default;

  return (
    <>

      <Carousel />
      {/* <Intro data={content.intro} /> */}
      <div className="max-w-screen-xl mx-auto">
        <Services data={content.services} />
        {/* <Projects locale={safeLocale} /> */}
        <Process data={content.process} />
        <Contact data={content.contact} />
        <Pricing locale={safeLocale} data={content.pricing} />
      </div>
    </>
  );
}

