//components/sections/AboutTeam.tsx

interface AboutTeamProps {
    data: {
        eyebrow: string;
        title: string;
        members?: {
            name: string;
            role: string;
            image: string;
        }[];
    };
}

export default function AboutTeam({ data }: AboutTeamProps) {
    if (!data.members) return null;

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <p className="text-xs tracking-widest text-gray-400 uppercase">
                        {data.eyebrow}
                    </p>
                    <h2 className="text-4xl font-serif mt-2">
                        {data.title}
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {data.members.map((member, i) => (
                        <div key={i}>
                            <img
                                src={member.image}
                                alt={member.name}
                                className="rounded-2xl mb-4"
                            />
                            <h3 className="font-medium">
                                {member.name}
                            </h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
