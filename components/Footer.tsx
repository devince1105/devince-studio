import Link from "next/link";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    items: FooterLink[];
}

interface FooterData {
    brand: {
        name: string;
        description: string;
    };
    social: FooterLink[];
    sections: {
        services: FooterSection;
        company: FooterSection;
        connect: FooterSection;
    };
    legal: {
        copyright: string;
        privacy: string;
        terms: string;
    };
}

interface FooterProps {
    locale: string;
    data: FooterData;
}

export default function Footer({ locale, data }: FooterProps) {
    const year = new Date().getFullYear();

    const getLink = (href: string) => {
        if (href.startsWith("/")) {
            return `/${locale}${href}`;
        }
        return href;
    };

    return (
        <footer className="bg-gray-100 dark:bg-zinc-950 text-gray-700 dark:text-zinc-400 pt-20 pb-10 px-6 transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto">

                {/* Top Grid */}
                <div className="grid md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
                            {data.brand.name}
                        </div>

                        <p className="text-sm leading-relaxed text-gray-600 dark:text-zinc-500">
                            {data.brand.description}
                        </p>

                        <div className="flex gap-4 text-sm text-gray-500">
                            {data.social.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="hover:text-black dark:hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Sections */}
                    {Object.values(data.sections).map((section, index) => (
                        <div key={index}>
                            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                                {section.title}
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-600 dark:text-zinc-500">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={getLink(item.href)}
                                            className="hover:text-black dark:hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 dark:border-zinc-800 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500 dark:text-zinc-600">
                    <p>
                        © {year} {data.brand.name}. {data.legal.copyright}
                    </p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href={getLink("/privacy")} className="hover:text-black dark:hover:text-white transition-colors">
                            {data.legal.privacy}
                        </Link>
                        <Link href={getLink("/terms")} className="hover:text-black dark:hover:text-white transition-colors">
                            {data.legal.terms}
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
