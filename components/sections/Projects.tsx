export default function Projects() {
    return (
        <section className="py-32 bg-[#ececea]">
            <div className="container mx-auto px-6">

                <p className="text-xs tracking-widest text-gray-400 uppercase">
                    Selected Work
                </p>

                <h2 className="text-4xl font-serif mt-2 mb-16">
                    Recent Projects
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white h-64 rounded-lg" />
                    <div className="bg-white h-64 rounded-lg" />
                    <div className="bg-white h-64 rounded-lg" />
                </div>

            </div>
        </section>
    )
}
