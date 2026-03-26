// components/sections/TimelineItem.tsx
interface TimelineItemProps {
    index: number;
    title: string;
    description: string;
    duration?: string;
}

export default function TimelineItem({
    index,
    title,
    description,
    duration,
}: TimelineItemProps) {
    return (
        <div className="relative pl-20">

            {/* 圓圈編號 */}
            <div className="absolute left-0 top-2 w-12 h-12 flex items-center justify-center
                        rounded-full border border-gray-400 text-sm font-medium bg-white">
                {String(index).padStart(2, "0")}
            </div>

            {/* 內容 */}
            <h3 className="text-2xl font-serif mb-3">{title}</h3>

            <p className="text-gray-600 mb-4 max-w-xl">
                {description}
            </p>

            {duration && (
                <span className="inline-block px-4 py-1 text-xs bg-gray-100 rounded-full text-gray-500">
                    {duration}
                </span>
            )}
        </div>
    );
}
