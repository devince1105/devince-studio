// components/sections/Pricing.tsx (Server Component)
import PricingStage from "./PricingStage";

export default async function Pricing({ locale, data }: { locale: string; data: any }) {
    // Correctly fetch data on the server
    const pricingData = (
        await import(`@/data/locales/${locale}/pricing.json`)
    ).default;

    return <PricingStage data={data} pricingData={pricingData} />;
}
