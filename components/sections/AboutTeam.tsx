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
        <section className="py-24 transition-colors duration-300">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <p className="text-xs tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
                        {data.eyebrow}
                    </p>
                    <h2 className="text-4xl font-serif mt-2 text-gray-900 dark:text-zinc-100">
                        {data.title}
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {data.members.map((member, i) => (
                        <div key={i} className="group">
                            <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-100 dark:bg-zinc-900">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-zinc-100">
                                {member.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-wide">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
