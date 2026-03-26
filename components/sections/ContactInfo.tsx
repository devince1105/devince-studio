// components/sections/ContactInfo.tsx

interface ContactInfoProps {
    data: {
        title: string;
        emailLabel: string;
        email: string;
        phoneLabel: string;
        phone: string;
        officeLabel: string;
        addressLines: string[];
        followLabel?: string;
    };
}

export default function ContactInfo({ data }: ContactInfoProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-serif">
                {data.title}
            </h3>

            {/* Email */}
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                    {data.emailLabel}
                </p>
                <p className="text-neutral-700">{data.email}</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                    {data.phoneLabel}
                </p>
                <p className="text-neutral-700">{data.phone}</p>
            </div>

            {/* Office */}
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                    {data.officeLabel}
                </p>
                <div className="text-neutral-700 space-y-1">
                    {data.addressLines.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>

            {data.followLabel && (
                <div className="pt-6">
                    <p className="text-xs uppercase tracking-widest text-neutral-400">
                        {data.followLabel}
                    </p>
                </div>
            )}
        </div>
    );
}
