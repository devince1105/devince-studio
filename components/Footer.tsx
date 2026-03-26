// components/Footer.tsx

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

    return (
        <footer className="bg-gray-100 text-gray-700 pt-20 pb-10 px-6">
            <div className="max-w-screen-xl mx-auto">

                {/* Top Grid */}
                <div className="grid md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="text-lg font-semibold">
                            {data.brand.name}
                        </div>

                        <p className="text-sm leading-relaxed text-gray-600">
                            {data.brand.description}
                        </p>

                        <div className="flex gap-4 text-sm text-gray-500">
                            {data.social.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="hover:text-black"
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
                            <ul className="space-y-3 text-sm text-gray-600">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <a href={item.href} className="hover:text-black">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                    <p>
                        © {year} {data.brand.name}. {data.legal.copyright}
                    </p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-black">
                            {data.legal.privacy}
                        </a>
                        <a href="#" className="hover:text-black">
                            {data.legal.terms}
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
