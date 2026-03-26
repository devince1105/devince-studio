// app/[locale]/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  const safeLocale = ["en", "tw", "jp"].includes(locale)
    ? locale
    : "en";

  // ✅ 載入 navbar.json
  const navbarData = (
    await import(`@/data/locales/${safeLocale}/navbar.json`)
  ).default;

  // （如果 footer 也有 json）
  const footerData = (
    await import(`@/data/locales/${safeLocale}/footer.json`)
  ).default;

  return (
    <>
      <Navbar locale={safeLocale} data={navbarData} />
      <main className="bg-white text-black">

        {children}

      </main >
      <Footer locale={safeLocale} data={footerData} />
    </>
  );
}
