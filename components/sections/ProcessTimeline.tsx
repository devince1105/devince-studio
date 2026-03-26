//components/sections/ProcessTimeline.tsx

interface ProcessTimelineProps {
    children: React.ReactNode;
}

export default function ProcessTimeline({
    children,
}: ProcessTimelineProps) {
    return (
        <section className="relative py-24">
            <div className="container mx-auto px-6 relative">

                {/* 垂直線 */}
                <div className="absolute left-20 top-0 bottom-0 w-px bg-teal-500/50 hidden md:block" />

                <div className="space-y-24">
                    {children}
                </div>
            </div>
        </section>
    );
}
